import { MailService } from '../../libs/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { TokenType, type User } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { verify } from 'argon2';
import { TelegramService } from '../../libs/telegram/telegram.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { generateToken } from '@/shared/utils/generate-token.util';
import { destroySession } from '@/shared/utils/session.util';

@Injectable()
export class DeactivateService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly telegramService: TelegramService
    ) { }

    public async deactivate(
        req: Request, 
        input: DeactivateAccountInput,
        user: User,
        userAgent: string
    ) {
        const { email, password, pin} = input

        if(user.email !== email) throw new BadRequestException('Incorrect email')

        const isValidPassword = await verify(user.password, password)

        if(!isValidPassword) throw new BadRequestException('Incorrect password')

        if(!pin) {
            await this.sendDeactivateToken(req, user, userAgent)

            return { message: 'Verification code required' }
        }

        await this.validateDeactivateToken(req, pin)

        return { user }
    }

    private async validateDeactivateToken(req: Request, token: string) {
        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token,
                type: TokenType.DEACTIVATE_ACCOUNT
            }
        })

        if (!existingToken) throw new NotFoundException('Token not found')

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) throw new BadRequestException('Token exprired')

        const user = await this.prismaService.user.update({
            where: { id: existingToken.userId },
            data: { 
				isDeactivated: true,
				deactivatedAt: new Date()
            }
        })

        await this.prismaService.token.delete({
            where: { id: existingToken.id, type: TokenType.DEACTIVATE_ACCOUNT }
        })

        await this.clearSessions(user.id)

        return destroySession(req, this.configService)
    }

    private async sendDeactivateToken(req: Request, user: User, userAgent: string) {
        const deactivateToken = await generateToken(
            this.prismaService,
            user,
            TokenType.DEACTIVATE_ACCOUNT,
            false
        )

        const metadata = getSessionMetadata(req, userAgent)

        await this.mailService.sendDeactivateToken(user.email, deactivateToken.token, metadata)


        if(deactivateToken.user.notificationSettings.telegramNotifications && deactivateToken.user.telegramId) {
            await this.telegramService.sendDeactivateToken(deactivateToken.user.telegramId, deactivateToken.token, metadata)
        }

        return true
    }

    private async clearSessions(userId: string) {
        const keys = await this.redisService.keys('*')

        for (const key of keys) {
            const sessionData = await this.redisService.get(key)

            if (sessionData) {
                const session = JSON.parse(sessionData)

                if (session.userId === userId) {
                    await this.redisService.del(key)
                }
            }
        }
    }
}

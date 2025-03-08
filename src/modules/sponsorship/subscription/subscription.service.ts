import { PrismaService } from '@/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';

@Injectable()
export class SubscriptionService {
    public constructor(
        private readonly prismaService: PrismaService
    ) {}

    public async findMySponsors(user: User) {
        const sponsors = await this.prismaService.sponsorshipSubscription.findMany({
            where: {
                channelId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                plan: true,
                user: true,
                channel: true
            }
        })

        return sponsors
    }
}

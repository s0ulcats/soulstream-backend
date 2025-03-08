import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VerificationTemplate } from './templates/verification.template';
import { render } from '@react-email/components';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';
import type { SessionMetadata } from '@/shared/types/session-metadata.type';
import { DeactivateTemplate } from './templates/deactivate.template';
import { AccountDeletionTemplate } from './templates/account-delation';
import { EnableTwoFactorTemplate } from './templates/enable-two-factor.template';
import { VerifyChannelTemplate } from './templates/verify-channel.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService, 
    private readonly configService: ConfigService) {

  }

  public async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(VerificationTemplate({ domain, token}))

    return this.sendMail(email, 'Account Verification', html)
  }

  public async sendPasswordResetToken(email: string, token: string, metadata: SessionMetadata) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(PasswordRecoveryTemplate({ domain, token, metadata}))

    return this.sendMail(email, 'Password Reset', html)
  }

  public async sendDeactivateToken(email: string, token: string, metadata: SessionMetadata) {
    const html = await render(DeactivateTemplate({ token, metadata}))

    return this.sendMail(email, 'Account deactivation', html)
  }
  
  public async sendAccountDeletion(email: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(AccountDeletionTemplate({ domain }))

    return this.sendMail(email, 'Account deleted', html)
  }
  
  public async sendEnableTwoFactor(email: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(EnableTwoFactorTemplate({ domain }))

    return this.sendMail(email, 'Ensure your security', html)
  }
  
  public async sendVerifyChannel(email: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(VerifyChannelTemplate())

    return this.sendMail(email, 'Your channel has been verified', html)
  }

  private sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html
    })
  }
}

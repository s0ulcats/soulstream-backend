import { isDev } from "@/src/shared/utils/is-dev.util";
import type { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export function getMailerConfig(configService: ConfigService): MailerOptions {
    return {
        transport: {
            host: configService.getOrThrow<string>('MAIL_HOST'),
            port: configService.getOrThrow<string>('MAIL_PORT'),
            secure: false,
            auth: {
                user: configService.getOrThrow<string>('MAIL_LOGIN'),
                pass: configService.getOrThrow<string>('MAIL_PASSWORD')
            }
        },
        defaults: {
            from: `"Soulcat" ${configService.getOrThrow<string>('MAIL_LOGIN')}`
        }
    };
}
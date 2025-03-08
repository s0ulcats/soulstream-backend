import { TypeStripeOptions } from '@/modules/libs/stripe/types/Stripe.type'
import { ConfigService } from '@nestjs/config'

export function getStripeConfig(
	configService: ConfigService
): TypeStripeOptions {
	return {
		apiKey: configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
		config: {
			apiVersion: '2025-02-24.acacia'
		}
	}
}

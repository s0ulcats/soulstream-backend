import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { AuthModel } from '../account/models/auth.model'

import { VerificationInput } from './inputs/verification.input'
import { VerificationService } from './verification.service'
import { UserAgent } from '@/shared/decorations/userAgent.decorator'
import { GqlContext } from '@/shared/types/gql-context.type'

@Resolver('Verification')
export class VerificationResolver {
	public constructor(
		private readonly verificationService: VerificationService
	) {}

	@Mutation(() => AuthModel, { name: 'verifyAccount' })
	public async verify(
		@Context() { req }: GqlContext,
		@Args('data') input: VerificationInput,
		@UserAgent() userAgent: string
	) {
		return this.verificationService.verify(req, input, userAgent)
	}
}

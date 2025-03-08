import { Args, Mutation, Resolver } from '@nestjs/graphql'
import type { IngressInput } from 'livekit-server-sdk'

import { IngressService } from './ingress.service'
import { Authorization } from '@/shared/decorations/auth.decorator'
import { Authorized } from '@/shared/decorations/authorized.decorator'
import { User } from '@prisma/client'

@Resolver('Ingress')
export class IngressResolver {
	public constructor(private readonly ingressService: IngressService) {}

	@Authorization()
	@Mutation(() => Boolean, { name: 'createIngress' })
	public async create(
		@Authorized() user: User,
		@Args('ingressType') ingressType: IngressInput
	) {
		return this.ingressService.create(user, ingressType)
	}
}

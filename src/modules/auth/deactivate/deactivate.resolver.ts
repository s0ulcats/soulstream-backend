import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { DeactivateService } from './deactivate.service';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { AuthModel } from '../account/models/auth.model';
import { Authorization } from '@/shared/decorations/auth.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';
import { UserAgent } from '@/shared/decorations/userAgent.decorator';
import { Authorized } from '@/shared/decorations/authorized.decorator';

@Resolver('Deactivate')
export class DeactivateResolver {
  public constructor(private readonly deactivateService: DeactivateService) {

  }

  @Authorization()
  @Mutation(() => AuthModel, { name: 'deactivateAccount' })
    public async deactivate(
      @Context() { req }:GqlContext, 
      @Args('data') input: DeactivateAccountInput, 
      @UserAgent() userAgent: string,
      @Authorized() user: User
    ) {
      return this.deactivateService.deactivate(req, input, user, userAgent)
    }
}

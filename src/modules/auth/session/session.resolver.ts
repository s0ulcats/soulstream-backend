import { Authorization } from '@/shared/decorations/auth.decorator';
import { UserAgent } from '@/shared/decorations/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from '../account/models/auth.model';
import { LoginInput } from './inputs/login.input';
import { SessionModel } from './models/session.model';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  public constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => [SessionModel], {name: 'findSessionsByUser'})
  public async findByUser(@Context() { req }:GqlContext) {
    return this.sessionService.findByUser(req)
  }
  
  @Authorization()
  @Query(() => SessionModel, {name: 'findCurrentSession'})
  public async findCurrent(@Context() { req }:GqlContext) {
    return this.sessionService.findCurrent(req)
  }

  @Mutation(() => AuthModel, { name: 'login' })
  public async login(@Context() { req }:GqlContext, @Args('data') input: LoginInput, @UserAgent() userAgent: string) {
    return this.sessionService.login(req, input, userAgent)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'logout' })
  public async logout(@Context() { req }:GqlContext) {
    return this.sessionService.logout(req)
  }

  @Mutation(() => Boolean, { name: 'clearSessionCookie' })
  public async clearSession(@Context() { req }:GqlContext) {
    return this.sessionService.clearSession(req)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSession' })
  public async remove(@Context() { req }:GqlContext, @Args('id') id: string) {
    return this.sessionService.remove(req, id)
  }

}

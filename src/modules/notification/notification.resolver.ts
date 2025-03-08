import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Authorized } from '@/shared/decorations/authorized.decorator';
import type { User } from '@prisma/client';
import { NotificationModel } from './models/notification.model';
import { Authorization } from '@/shared/decorations/auth.decorator';
import { ChangeNotificationsSettingsResponse } from './models/notification-settings.model';
import { ChangeNotificationsSettingsInput } from './inputs/change-notification-settings.input';

@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) { }

  @Authorization()
  @Query(() => Number, { name: "findNotificationsUnreadCount" })
  public async findUnreadCount(
    @Authorized() user: User
  ) {
    return this.notificationService.findUnreadCount(user)
  }

  @Authorization()
  @Query(() => [NotificationModel], { name: "findNotificationsByUser" })
  public async findByUser(
    @Authorized() user: User
  ) {
    return this.notificationService.findByUser(user)
  }

@Authorization()
@Mutation(() => ChangeNotificationsSettingsResponse, { name: "changeNotificationsSettings" })
  public async changeSettings(
    @Authorized() user: User,
    @Args('data') input: ChangeNotificationsSettingsInput
  ) {
    return this.notificationService.changeSettings(user, input)
  }
}

import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Follow } from '@prisma/client'
import { StreamModel } from '../../stream/models/stream.model'
import { UserModel } from '../../auth/account/models/user.model'

@ObjectType()
export class FollowModel implements Follow {
    @Field(() => ID)
    public id: string

    @Field(() => UserModel)
    public follower: UserModel

    @Field(() => String)
    public followerId: string

    @Field(() => UserModel)
    public following: UserModel

    @Field(() => String)
    public followingId: string

    @Field(() => Date)
    public createdAt: Date

    @Field(() => Date)
    public updatedAt: Date
}

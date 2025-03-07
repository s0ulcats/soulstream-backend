import { Authorization } from '@/shared/decorations/auth.decorator';
import { Authorized } from '@/shared/decorations/authorized.decorator';
import { FileValidationPipe } from '@/shared/pipes/file-validation.pipe';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { FiltersInput } from './inputs/filters.input';
import { StreamModel } from './models/stream.model';
import { StreamService } from './stream.service';
import { GenerateStreamTokenModel } from './models/generate-stream-token.model';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';
import type { User } from '@prisma/client';

@Resolver('Stream')
export class StreamResolver {
  public constructor(private readonly streamService: StreamService) { }

  @Query(() => [StreamModel], { name: 'findAllStreams' })
  public async findAll(@Args('filters') input: FiltersInput) {
    return this.streamService.findAll(input)
  }

  @Query(() => [StreamModel], { name: 'findRandomStreams' })
  public async findRandom() {
    return this.streamService.findRandom()
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamInfo' })
  public async changeInfo(
    @Authorized() user: User,
    @Args('data') input: ChangeStreamInfoInput
  ) {
    return this.streamService.changeInfo(user, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamThumbnail' })
  public async changeThumbnail(
    @Authorized() user: User,
    @Args('thumbnail', { type: () => GraphQLUpload }, FileValidationPipe)
    thumbnail: Upload
  ) {
    return this.streamService.changeThumbnail(user, thumbnail)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeStreamThumbnailUrl' })
  public async removeThumbnailUrl(@Authorized() user: User) {
    return this.streamService.removeThumbnailUrl(user)
  }

  @Mutation(() => GenerateStreamTokenModel, { name: 'generateStreamToken' }) 
  public async generateToken(@Args('data') input: GenerateStreamTokenInput) {
    return this.streamService.generateToken(input)
  }
}

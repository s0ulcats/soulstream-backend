import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ChangeProfileInfoInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
    public username: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public displayName: string;

    @Field(() => String)
    @IsString()
    @IsOptional()
    @MaxLength(300)
    public bio?: string;
}

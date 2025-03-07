import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class ChangeEmailInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}

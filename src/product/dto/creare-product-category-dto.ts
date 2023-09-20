import {IsNotEmpty, IsString, IsMongoId} from'class-validator'

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
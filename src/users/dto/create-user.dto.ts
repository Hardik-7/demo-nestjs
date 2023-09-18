import {IsNotEmpty, IsString, IsInt, IsEmail} from'class-validator'
export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    readonly name:String;
    @IsNotEmpty()
    @IsString()
    readonly password:String;
}
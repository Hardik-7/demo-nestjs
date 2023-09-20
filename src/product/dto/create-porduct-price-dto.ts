import {IsNotEmpty, IsString, IsNumber} from'class-validator'
export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    readonly sku:String;

    @IsNotEmpty()
    @IsNumber()
    readonly category:Number;
}
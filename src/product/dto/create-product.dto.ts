import {IsNotEmpty, IsString, IsMongoId, IsInt} from'class-validator'
export class CreateProductDto{

    @IsNotEmpty()
    @IsString()
    readonly ProductName: string;

    @IsNotEmpty()
    @IsString()
    readonly sku:String;

    @IsNotEmpty()
    @IsInt()
    readonly category:Number;
}
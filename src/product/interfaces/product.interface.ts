import { Document } from "mongoose";

export interface Product extends Document {
    readonly productName: String;
    readonly sku: String;
    readonly category: Number;
}

export interface ProductRes {
    readonly productName: String;
    readonly sku: String;
    readonly category: String;
    readonly price: Number;
}


export interface ProductCategories extends Document {
    readonly name: String;
    readonly CatgoryId: Number;
}

export interface ProductPrices extends Document {
    readonly sku: String;
    readonly price: Number ;
}


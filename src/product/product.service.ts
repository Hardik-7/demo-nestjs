import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductCategories, ProductPrices, ProductRes } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategoryData, ProductPriceData, ProductData } from './data/product.data';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Products') private readonly ProductModel: Model<Product>,
        @InjectModel('ProductCategories') private readonly ProductCategoryModel: Model<ProductCategories>,
        @InjectModel('ProductPrices') private readonly ProductPriceModel: Model<ProductPrices>,
    ){}   

    async initProducts(): Promise<boolean>{
          // remove old data
            await Promise.all([
                this.ProductModel.deleteMany(),
                this.ProductCategoryModel.deleteMany(),
                this.ProductPriceModel.deleteMany()
            ])
            // create new data
            await Promise.all([
                this.ProductModel.insertMany(ProductData),
                this.ProductCategoryModel.insertMany(ProductCategoryData),
                this.ProductPriceModel.insertMany(ProductPriceData)
            ])
            return true 
        }
    
    async findAll(): Promise<ProductRes[]>{
        const product = await this.ProductModel.aggregate([
            // {
            //     $lookup:{
            //         from: "productcategories",
            //         localField:"categoryId",
            //         foreignField: "category",
            //         as: "fromItems1"
            //     }
            // },
            {
                $lookup:{
                    from: "productprices",
                    localField:"sku",
                    foreignField: "sku",
                    as: "fromItems2"
                }
            },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems1", 0 ] }, "$$ROOT" ] } }
            // },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems2", 0 ] }, "$$ROOT" ] } }
            },
            {
                $match:{
                    fromItems2: { 
                        "$exists": true,
                        "$ne": [],
                    },
                }     
            },
            {
                $project:{
                    sku:1,
                    productName:1,
                    category:1,
                    price:1
                }
            }        
        ])
        return product     
    }
}

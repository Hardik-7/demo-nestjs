import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductCategorySchema } from './schemas/category.schema';
import { ProductPriceSchema } from './schemas/price.schema';

@Module({
  imports :[
    MongooseModule.forFeature([
      {name :'Products', schema:ProductSchema},
      {name :'ProductCategories', schema:ProductCategorySchema},
      {name :'ProductPrices', schema:ProductPriceSchema},
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

import { Body, Controller, Get, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { HttpExceptionFilter } from 'src/comman/filters/http-exception.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRes } from './interfaces/product.interface';
import { TransformInterceptor } from '../comman/transform/transform.interceptor';


@Controller('product')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post('seed')
  async initProduct(): Promise<boolean>{
    return await this.productService.initProducts();
  }

  @Get()
  async listProducts():Promise<ProductRes[]> {
    return await this.productService.findAll()
  }

}


import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "src/nestjs-products/service/product.service";
import { Product } from "../entity/product.entity";



@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [],
  controllers: [ProductService],
})
export class ProductModule {}



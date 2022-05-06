import { Controller, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { Repository } from 'typeorm'
import { GrpcMethod } from "@nestjs/microservices";
import { CreateProductDto } from "../dto/createProduct.dto";

@Controller()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}

    @GrpcMethod('ProductService', 'AddProduct')
    async AddProduct(product: CreateProductDto){
        const newProduct = await this.productsRepository.create(product)
        console.log(product)
        await this.productsRepository.save(newProduct)
        console.log(newProduct)
        return newProduct
    }

    @GrpcMethod('ProductService', 'GetAllProducts')
    async GetAllProducts(){
        console.log('grpc call', await this.productsRepository.find())
        return {data: await this.productsRepository.find()}
        // return this.productsRepository.find()
    }

}
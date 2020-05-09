import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductCategory } from './productCategory.enum';
import { CreateProductDto } from './dto/createProduct.dto';
//import { UpdateProductDto } from './dto/updateProduct.dto';
import { GetProductsFilterDto } from './dto/getProductsFilter.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  //#region *********PRODUCTS***************

  // @desc Creates a product
  // @access Public
  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return await this.productRepository.createProduct(createProductDto, user);
  }

  // @desc Gets all products
  // @access Public
  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    return await this.productRepository.getProducts(filterDto);
  }

  // @desc Gets product by id
  // @access Public
  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Oops! Product with ID:${id} not found`);
    }
    return found;
  }

  // // @desc Update a product category
  // // @access Public
  async updateProductCategory(
    id: number,
    category: ProductCategory,
  ): Promise<Product> {
    const product = await this.getProductById(id);
    product.category = category;
    await product.save();
    return product;
  }

  // @desc Delete a product
  // @access Public
  async deleteProduct(id: number): Promise<string> {
    //const found = this.getProductById(id);
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Oops! Product with ID:${id} not found`);
    } else {
      return 'Product deleted successfully';
    }
  }
  //#endregion
}

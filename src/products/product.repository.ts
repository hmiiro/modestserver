import { Repository, EntityRepository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductsFilterDto } from './dto/getProductsFilter.dto';
import { User } from 'src/auth/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  // create Product
  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, description, category } = createProductDto;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.category = category;
    product.createdBy = user.id;
    //save to db
    try {
      await product.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate product name
        throw new ConflictException(`Product with name:${name} already exists`);
      } else {
        // other errors
        throw new InternalServerErrorException();
      }
    }
    return product;
  }

  // get Products
  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { search, category } = filterDto;

    const query = this.createQueryBuilder('product');
    if (category) {
      query.andWhere('product.category = :category', { category });
    }
    if (search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const products = await query.getMany();
    return products;
  }
}

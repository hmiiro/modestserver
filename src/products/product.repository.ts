import { Repository, EntityRepository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductsFilterDto } from './dto/getProductsFilter.dto';
import { ProductCategory } from '../products/productStatus.enum';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  // create Product
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, category } = createProductDto;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.category = category;
    //save to db
    await product.save();

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

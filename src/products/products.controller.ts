import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCategory } from './productStatus.enum';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductsFilterDto } from './dto/getProductsFilter.dto';
import { ProductCategoryValidationPipe } from './pipes/productCatValidation.pipe';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //#region *********PRODUCTS***************
  //TODO: Fix access with auth for all

  // @desc Creates a product
  // @route POST /products
  // @access Public
  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  // @desc Gets all products with or without filters
  // @route GET /products
  // @access Public
  @Get()
  getProducts(@Query(ValidationPipe) filterDto: GetProductsFilterDto) {
    return this.productsService.getProducts(filterDto);
  }

  // @desc Gets product by id
  // @route GET /products/id
  // @access Public
  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  // @desc update a product category
  // @route PATCH/PUT /products/id
  // @access Public
  @Patch('/:id/category')
  updateProductCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('category', ProductCategoryValidationPipe) category: ProductCategory,
  ): Promise<Product> {
    return this.productsService.updateProductCategory(id, category);
  }

  // @desc Delete a product
  // @route DELETE /products/id
  // @access Public
  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.productsService.deleteProduct(id);
  }

  //#endregion
}

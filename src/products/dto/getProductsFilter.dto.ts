import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

import { ProductCategory } from '../productStatus.enum';

export class GetProductsFilterDto {
  @IsOptional()
  @IsIn([ProductCategory.WOMEN, ProductCategory.MEN, ProductCategory.KIDS])
  category: ProductCategory;
  @IsNotEmpty()
  @IsOptional()
  search: string;
}

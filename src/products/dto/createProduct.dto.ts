import { IsNotEmpty, IsIn } from 'class-validator';
import { ProductCategory } from '../productStatus.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsIn([ProductCategory.WOMEN, ProductCategory.MEN, ProductCategory.KIDS])
  category: ProductCategory;
}

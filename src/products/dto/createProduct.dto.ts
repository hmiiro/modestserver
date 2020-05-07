import { IsNotEmpty, IsIn } from 'class-validator';
import { ProductCategory } from '../productCategory.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsIn([ProductCategory.WOMEN, ProductCategory.MEN, ProductCategory.KIDS])
  category: ProductCategory;
}

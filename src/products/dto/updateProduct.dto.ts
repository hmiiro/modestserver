import { ProductCategory } from '../productCategory.enum';

export class UpdateProductDto {
  name?: string;
  description?: string;
  category?: ProductCategory;
}

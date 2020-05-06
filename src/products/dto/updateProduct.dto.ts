import { ProductCategory } from '../productStatus.enum';

export class UpdateProductDto {
  name?: string;
  description?: string;
  category?: ProductCategory;
}

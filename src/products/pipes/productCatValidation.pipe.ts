import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ProductCategory } from '../productCategory.enum';

export class ProductCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [
    ProductCategory.WOMEN,
    ProductCategory.MEN,
    ProductCategory.KIDS,
  ];
  transform(value: any) {
    //make it uppercase
    const upperValue = value.toUpperCase();
    //if its not valid
    if (!this.isCategoryValid(upperValue)) {
      throw new BadRequestException(`${value} is not a valid category`);
    }
    // return validated category
    return upperValue;
  }

  private isCategoryValid(category: any) {
    // check its index. returns 1 if its valid
    const idx = this.allowedCategories.indexOf(category);
    return idx !== -1;
  }
}

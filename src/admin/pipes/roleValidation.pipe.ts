import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Role } from '../role.entity';

export class RoleValidationPipe implements PipeTransform {
  async getRoles() {
    return await Role.find();
  }
  readonly allowedRoles = this.getRoles();
  transform(value: any) {
    //make it uppercase
    const upperValue = value.toUpperCase();
    //if its not valid
    if (!this.isRoleValid(upperValue)) {
      throw new BadRequestException(`${value} is not a valid category`);
    }
    // return validated category
    return upperValue;
  }

  private async isRoleValid(role: any) {
    // check its index. returns 1 if its valid
    const idx = (await this.allowedRoles).indexOf(role);
    return idx !== -1;
  }
}

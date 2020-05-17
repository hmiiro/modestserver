import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from 'src/admin/role.entity';
import { In } from 'typeorm';

@ValidatorConstraint({ name: 'RoleType', async: false })
export class RoleTypeValidator implements ValidatorConstraintInterface {
  async getRoles() {
    const res = await Role.find({
      where: {
        /*
        Other roles like customer and supplier cant be assigned
        to internal user hence not considered
        */
        name: In([
          'ADMIN',
          'DIRECTOR',
          'MANAGER',
          'SUPERVISOR',
          'USER',
          'SUPPORT',
        ]),
      },
    });
    const roles = res.map(role => {
      return role.name;
    });

    return roles;
  }

  readonly allowedRoles = this.getRoles();

  async validate(value: any): Promise<boolean> {
    //console.log(value);
    const idx = (await this.allowedRoles).indexOf(value);

    return idx !== -1; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return `Provided role is invalid!`;
  }
}

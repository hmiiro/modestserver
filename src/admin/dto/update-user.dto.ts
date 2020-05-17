import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';
import { Validate } from 'class-validator';

import { Status } from 'src/utils/status.enum';
import { ActionType } from 'src/admin/enums/actions.enum';
import { RoleType } from 'src/admin/enums/roles.enum';
import { RoleTypeValidator } from '../pipes/RoleTypeValidator';
import { ActionTypeValidator } from '../pipes/ActionValidator';
import { Action } from '../action.entity';

export class UpdateMeDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

//export type UpdateUserDto = Partial<RegisterDto>;
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  // this excludes customers and suppliers
  // @IsIn([
  //   RoleType.ADMIN,
  //   RoleType.DIRECTOR,
  //   RoleType.MANAGER,
  //   RoleType.SUPERVISOR,
  //   RoleType.USER,
  // ])
  @Validate(RoleTypeValidator)
  role: RoleType;

  @IsOptional()
  @IsIn([Status.ACTIVE, Status.INACTIVE])
  status: Status;

  @IsOptional()
  @Validate(ActionTypeValidator)
  actions: [string];
}

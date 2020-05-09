import { IsNotEmpty, IsString } from 'class-validator';
import { ActionGroup } from '../rolesAndActions/Actions.enum';
export class CreateUserActionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  group: ActionGroup;
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  role: string;
}

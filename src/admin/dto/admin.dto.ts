import { IsNotEmpty, IsString } from 'class-validator';
import { ActionGroup } from '../rolesAndActions/rolesAndActions.enum';
export class CreateUserActionDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  group: ActionGroup;
}

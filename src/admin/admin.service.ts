import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserAction } from './userAction.entity';
import { CreateUserActionDto } from './dto/admin.dto';
@Injectable()
export class AdminService {
  //#region CREATE USER ACTION
  async createUserAction(userActionDto: CreateUserActionDto): Promise<string> {
    const { action, group } = userActionDto;

    const userAction = new UserAction();
    userAction.action = action;
    userAction.group = group;

    // save action
    try {
      await userAction.save();
      return `Action ${action} saved successfuly`;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate action
        throw new ConflictException(`Action:${action} already exists`);
      } else {
        // other errors
        throw new InternalServerErrorException();
      }
    }
  }
  //#endregion
}

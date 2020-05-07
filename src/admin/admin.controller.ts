import {
  Controller,
  ValidationPipe,
  UsePipes,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserActionDto } from './dto/admin.dto';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {
  constructor(private adminService: AdminService) {}

  //#region *********ROLES AND ACTIONS***************
  //TODO: Fix access with auth for all

  // @desc Create User Role
  // @route POST /auth/action
  // @access Public
  @Post('/actions')
  @UsePipes(ValidationPipe)
  createUserAction(
    @Body() userActionDto: CreateUserActionDto,
  ): Promise<string> {
    return this.adminService.createUserAction(userActionDto);
  }

  //#endregion
}

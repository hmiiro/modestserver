import {
  Controller,
  ValidationPipe,
  UsePipes,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  CreateUserActionDto,
  CreateRoleDto,
} from './dto/actions-and-roles.dto';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { Action } from '../admin/action.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {
  constructor(private adminService: AdminService) {}

  //#region *********ROLES AND ACTIONS***************

  // @desc Create User Role
  // @route POST /admin/actions
  // @access Private
  @Post('/actions')
  @UsePipes(ValidationPipe)
  createAction(@Body() userActionDto: CreateUserActionDto): Promise<string> {
    return this.adminService.createUserAction(userActionDto);
  }

  @Get('/actions')
  getActions(): Promise<Action[]> {
    return this.adminService.getActions();
  }

  // @desc Create User Role
  // @route POST /admin/roles
  // @access Private
  @Post('/roles')
  @UsePipes(ValidationPipe)
  createRole(@Body() roleDto: CreateRoleDto): Promise<string> {
    return this.adminService.createRole(roleDto);
  }

  //#endregion

  //#region *********MANAGING USERS***************
  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @Get('/users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.adminService.getUserById(id);
  }

  // @desc Update a user by Admin
  // @route PATCH /admin/users/:id
  // @access by ADMIN
  @Patch('/users/:id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.adminService.updateUser(id, updateUserDto);
  }

  //#endregion
}

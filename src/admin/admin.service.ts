import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Action } from './action.entity';
import { CreateUserActionDto, CreateRoleDto } from './dto/admin.dto';
import { User } from 'src/auth/user.entity';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { UpdateUserDto, UpdateMeDto } from 'src/auth/dto/auth.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  //#region *********USERS***************
  // @desc Gets all users
  // @access ADMIN
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    // remove password and salt details from user details
    users.map(user => {
      delete user.password, delete user.salt;
      delete user.role.id;
    });
    return users;
  }

  // @desc Gets user by id
  // @access ADMIN
  async getUserById(id: number): Promise<User> {
    const user = await User.findOne(id);
    delete user.password;
    delete user.salt;
    delete user.role.id;
    if (!user) {
      throw new NotFoundException(`Oops! User with ID:${id} not found`);
    }
    return user;
  }

  // // @desc User Self-Updating
  // // @access user
  async updateMe(id: number, updateMe: UpdateMeDto): Promise<User> {
    const user = await User.findOne(id);

    await user.save();
    return user;
  }

  // // @desc Update a user by Admin
  // // @access ADMIN
  // async updateUser(id: number, updateUser: UpdateUserDto): Promise<void> {
  //   await this.userRepository.update(id, updateUser);
  //   const updatedUser = await this.userRepository.findOne(id);
  //   console.log(updatedUser);
  // }
  async updateUser(id: number, updateUser: UpdateUserDto): Promise<void> {
    const user = await this.getUserById(id);
    console.log(user);
    const { firstname, lastname, email, role, status, actions } = updateUser;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.role = role;
    user.status = status;
    user.actions = actions;
    try {
      await user.save();
      console.log(user);
      //return `User ${user.firstname} ${user.lastname} registered successfuly`;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Error Updating Selected User`);
    }
    //return user;
  }
  //#endregion

  //#region *********ROLES AND ACTIONS***************

  async createRole(roleDto: CreateRoleDto): Promise<string> {
    const { role } = roleDto;

    const userRole = new Role();
    userRole.name = role;

    // save action
    try {
      await userRole.save();
      return `User Role:${role} saved successfuly`;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate action
        throw new ConflictException(`Role:${role} already exists`);
      } else {
        // other errors
        throw new InternalServerErrorException();
      }
    }
  }

  // CREATE USER ACTION
  async createUserAction(userActionDto: CreateUserActionDto): Promise<string> {
    const { name, group } = userActionDto;

    const action = new Action();
    action.name = name;
    action.group = group;

    // save action
    try {
      await action.save();
      return `Action ${name} saved successfuly`;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate action
        throw new ConflictException(`Action:${name} already exists`);
      } else {
        // other errors
        throw new InternalServerErrorException();
      }
    }
  }

  // @desc Gets all users
  // @access ADMIN
  async getActions(): Promise<Action[]> {
    const actions = await Action.find({ relations: ['users'] });

    return actions;
  }

  // @desc Gets all Roles
  // @access ADMIN
  async getRoles(): Promise<Role[]> {
    return await Role.find();
  }
  //#endregion
}

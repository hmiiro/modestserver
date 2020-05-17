import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Action } from './action.entity';
import {
  CreateUserActionDto,
  CreateRoleDto,
} from './dto/actions-and-roles.dto';
import { User } from 'src/auth/user.entity';
import { Role } from './role.entity';
import { UserRepository } from 'src/auth/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { In } from 'typeorm';

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
    const users = await this.userRepository.find({
      //relations: ['userActions'],
    });
    // remove password and salt details from user details
    users.map(user => {
      delete user.password, delete user.salt;
      //delete user.role;
    });
    return users;
  }

  // @desc Gets user by id
  // @access ADMIN
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    //console.log(user);
    if (!user) {
      throw new NotFoundException(`Oops! User with ID:${id} not found`);
    }
    delete user.password;
    delete user.salt;
    return user;
  }

  // @desc Updates user by id
  // @access ADMIN
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { firstname, lastname, email, role, status, actions } = updateUserDto;
    const user = await this.getUserById(id);
    // gets and checks assigned User actions if they exisit from db
    const assignedUserActions = await this.getAssignedActions(actions);

    // if (firstname) {
    //   user.firstname = firstname;
    // }

    // if (lastname) {
    //   user.lastname = lastname;
    // }
    // if (email) {
    //   user.email = email;
    // }
    // if (role) {
    //   user.role = role;
    // }
    // if (status) {

    //   user.status = status;
    // }
    // if (actions) {
    //   console.log(user.actions)
    //   user.actions = assignedUserActions;
    // }

    user.firstname = firstname;

    user.lastname = lastname;

    user.email = email;

    user.role = role;

    user.status = status;

    // checks for and returns the new actions to update to avoid error of duplicates
    const res = assignedUserActions.filter(
      ({ name: id1 }) => !user.actions.some(({ name: id2 }) => id2 === id1),
    );

    user.actions = assignedUserActions;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Error Updating Selected User`);
    }
    return user;
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

  // @desc Gets all actions
  // @access ADMIN
  async getActions(): Promise<Action[]> {
    const actions = await Action.find();

    return actions;
  }
  // @desc Gets all actions with related users
  // @access ADMIN
  async getActionsWithUsers(): Promise<Action[]> {
    const actions = await Action.find({ relations: ['users'] });

    return actions;
  }

  // @desc Gets all actions user has provided
  // @access ADMIN
  private async getAssignedActions(actions: [string]): Promise<Action[]> {
    const assignedActions = await Action.find({
      where: {
        /*
          Other roles like customer and supplier cant be assigned
          to internal user hence not considered
          */
        name: In(actions),
      },
    });

    return assignedActions;
  }
  // @desc Gets all Roles
  // @access ADMIN
  async getRoles(): Promise<Role[]> {
    return await Role.find();
  }
  //#endregion
}

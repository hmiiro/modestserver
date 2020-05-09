import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Role } from 'src/admin/role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(registerDto: RegisterDto): Promise<string> {
    const { firstname, lastname, email, password } = registerDto;
    // call for roles to save user with general "USER" role
    const role = await Role.findOne({ where: { name: 'USER' } });
    // Define an instance of user
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = role;

    try {
      await user.save();
      return `User ${user.firstname} ${user.lastname} registered successfuly`;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException(`Email:${email} already exists`);
      } else {
        // other errors
        throw new InternalServerErrorException();
      }
    }
  }

  // VALIDATE USER password at login
  async validateUserPassword(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
  // hash password at register
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

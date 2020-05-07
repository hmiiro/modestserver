import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(registerDto: RegisterDto): Promise<string> {
    const { firstname, lastname, email, password } = registerDto;

    // Define an instance of user
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    //TODO: Change this to be dynamic according to roles
    user.role = 'ADMIN';
    // save user
    try {
      await user.save();
      return `User ${user.firstname} ${user.lastname} registered successfuly`;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
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
      //const username = user.username;
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

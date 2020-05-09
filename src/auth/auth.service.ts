import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtPayload } from './jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  // REGISTER/SIGNUP USER
  register(registerDto: RegisterDto): Promise<string> {
    return this.userRepository.register(registerDto);
  }

  // LOGIN/SIGNIN USER
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // generate loggedin user details
    const email = user.email;
    const name = `${user.firstname} ${user.lastname}`;
    const role = user.role;
    const payload: JwtPayload = { name, email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}

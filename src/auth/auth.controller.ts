import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //#region *********USERS***************
  //TODO: Fix access with auth for all

  // @desc Registers a user
  // @route POST /auth/register
  // @access Public
  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body() registerDto: RegisterDto): Promise<string> {
    return this.authService.register(registerDto);
  }

  // @desc LOGIN a user
  // @route POST /auth/login
  // @access Public
  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
  //#endregion
}

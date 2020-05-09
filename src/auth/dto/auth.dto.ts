import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Role } from 'src/admin/role.entity';
import { Status } from 'src/utils/status.enum';
import { Action } from 'src/admin/action.entity';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    {
      message: 'password too week!',
    },
  )
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    {
      message: 'password too week!',
    },
  )
  password: string;
}

export class UpdateMeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

//export type UpdateUserDto = Partial<RegisterDto>;
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  role: Role;

  @IsOptional()
  status: Status;

  @IsOptional()
  @IsArray()
  actions: Action[];
}

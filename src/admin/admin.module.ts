import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}

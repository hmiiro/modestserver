import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductsModule, AuthModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

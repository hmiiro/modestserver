import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

import { ProductCategory } from './productCategory.enum';
import { User } from 'src/auth/user.entity';

@Entity('products')
@Unique(['name'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: ProductCategory;

  @Column()
  createdBy: number;
}

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ProductCategory } from './productCategory.enum';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: ProductCategory;
}

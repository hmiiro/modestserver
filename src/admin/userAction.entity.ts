import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('useractions')
@Unique(['action'])
export class UserAction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  group: string;

  @ManyToMany(type => User)
  @JoinTable()
  users: User[];
}

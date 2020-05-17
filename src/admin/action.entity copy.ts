import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('actions')
@Unique(['name'])
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  group: string;

  // @ManyToMany(
  //   () => User,
  //   (user: User) => user.actions,
  // )
  // users: User[];

  // @OneToMany(
  //   () => UsersAction,
  //   action => action.action,
  //   { cascade: ['insert', 'update'] },
  // )
  // actions: UsersAction[];
}

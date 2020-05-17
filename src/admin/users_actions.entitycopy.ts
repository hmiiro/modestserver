import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Action } from './action.entity';

@Entity('users_actions')
export class UsersAction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionId!: number;

  @Column()
  userId!: number;

  @ManyToOne(
    () => User,
    user => user.actions,
  )
  user: User;

  // @ManyToOne(
  //   () => Action,
  //   action => action.actions,
  // )
  // action: Action;
  // @ManyToOne(type => User, user => user.actions, { primary: true })
  // user: User;
}

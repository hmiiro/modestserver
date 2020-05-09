import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity('roles')
@Unique(['name'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => User,
    (user: User) => user.role,
  )
  public users: User[];
}

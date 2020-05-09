import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Action } from '../admin/action.entity';
import { Role } from '../admin/role.entity';
import { Status } from 'src/utils/status.enum';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToOne(
    () => Role,
    (role: Role) => role.users,
    {
      cascade: true,
      eager: true,
    },
  )
  role: Role;

  @Column({
    default: Status.INACTIVE,
  })
  status: Status;

  @ManyToMany(
    () => Action,
    (action: Action) => action.users,
    { eager: true },
  )
  @JoinTable()
  actions: Action[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

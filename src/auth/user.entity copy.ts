// import {
//   BaseEntity,
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   Unique,
//   ManyToMany,
//   ManyToOne,
//   JoinTable,
//   OneToMany,
// } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { Status } from '../utils/status.enum';

// import { Action } from 'src/admin/action.entity';

// @Entity('users')
// @Unique(['email'])
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   firstname: string;

//   @Column()
//   lastname: string;

//   @Column()
//   email: string;

//   @Column()
//   password: string;

//   @Column()
//   salt: string;

//   @Column()
//   role: string;

//   @Column({
//     default: Status.INACTIVE,
//   })
//   status: Status;

//   // @ManyToMany(
//   //   () => Action,
//   //   (action: Action) => action.users,
//   //   { eager: true, cascade: true },
//   // )
//   // @JoinTable({
//   //   name: 'user_actions',
//   //   joinColumn: {
//   //     name: 'user',
//   //     referencedColumnName: 'email',
//   //   },
//   //   inverseJoinColumn: {
//   //     name: 'action',
//   //     referencedColumnName: 'name',
//   //   },
//   // })
//   //actions: Action[];
//   @OneToMany(
//     () => UsersAction,
//     action => action.user,
//     { eager: true, cascade: ['insert', 'update'] },
//   )
//   actions: UsersActions[];

//   async validatePassword(password: string): Promise<boolean> {
//     const hash = await bcrypt.hash(password, this.salt);
//     return hash === this.password;
//   }
// }

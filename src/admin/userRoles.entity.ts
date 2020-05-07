import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('userroles')
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
}

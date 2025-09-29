import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

export const UserRoles = {
  user: 'user',
  admin: 'admin',
} as const;
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @Column({ enum: [UserRoles.user, UserRoles.admin], default: UserRoles.user })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.createdBy)
  tasks: Task[];
}

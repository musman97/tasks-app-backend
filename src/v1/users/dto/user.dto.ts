import { User } from 'src/v1/entities';
import { UserDtos, UserId, Users } from '../users.types';

export class UserDto {
  id: UserId;
  name: string;
  email: string;
  createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];

  static from(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static fromList(users: Users): UserDtos {
    return users.map((user) => this.from(user));
  }
}

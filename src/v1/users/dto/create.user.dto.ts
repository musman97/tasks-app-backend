import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';
import { UserRoles, type UserRole } from 'src/v1/entities';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn([UserRoles.admin, UserRoles.user])
  @IsOptional()
  role: UserRole;
}

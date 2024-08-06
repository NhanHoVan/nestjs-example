import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Role } from 'src/constants/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 254)
  email: string;

  @IsNotEmpty()
  @IsUUID()
  organizationId: string;

  @IsString()
  avatarUrl: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

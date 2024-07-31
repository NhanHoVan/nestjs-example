import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/constants/role.enum';
import { Status } from 'src/constants/status.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  avatarUrl: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsArray,
  Length,
} from 'class-validator';
import { ProjectStatus } from '../../constants/project-status.enum';
import { ProjectType } from 'src/constants/project-type.enum';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 6)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  description: string;

  @IsNotEmpty()
  @IsUUID()
  organizationId: string;

  @IsNotEmpty()
  @IsUUID()
  projectManagerId: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus = ProjectStatus.START_STATUS;

  @IsEnum(ProjectType)
  @IsOptional()
  type?: ProjectType;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

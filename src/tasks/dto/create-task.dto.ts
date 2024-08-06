import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TaskStatus } from 'src/constants/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

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
  ticketId: string;

  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.OPEN_STATUS;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  storyPoints?: number;

  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  sprint?: string;
}

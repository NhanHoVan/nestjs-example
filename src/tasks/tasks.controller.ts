import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { FindByIdDto } from 'src/shared/dto/validator.dto';
import { Task } from 'src/db/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { systemUserId } from 'src/constants/utils';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('ticket/:id')
  async getTasksByTicketId(@Param() params: FindByIdDto): Promise<Task[]> {
    return await this.taskService.getTasksByTicketId(params.id);
  }

  @Get(':id')
  async getProjectById(@Param() params: FindByIdDto): Promise<Task> {
    const task = await this.taskService.findTaskById(params.id);
    if (task === null) {
      throw new NotFoundException('Task does not exist!');
    } else {
      return task;
    }
  }

  @Post()
  async createProject(
    @Body() task: CreateTaskDto,
    // @Req() req: Request,
  ): Promise<Task> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    return this.taskService.create(task, systemUserId);
  }

  @Patch(':id')
  async updateProject(
    @Param() params: FindByIdDto,
    @Body() task: UpdateTaskDto,
    // @Req() req: Request,
  ): Promise<Task> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    const checkTaskId = await this.taskService.findTaskById(params.id);
    if (checkTaskId === null) {
      throw new NotFoundException('Task does not exist!');
    }
    return this.taskService.update(params.id, task, systemUserId);
  }

  @Delete(':id')
  async deleteTaskById(@Param() params: FindByIdDto): Promise<any> {
    const task = await this.taskService.findTaskById(params.id);
    if (task === null) {
      throw new NotFoundException('Task does not exist!');
    }
    return this.taskService.delete(params.id);
  }
}

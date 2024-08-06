import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/db/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { v7 as uuidv7 } from 'uuid';
import { TaskStatus } from 'src/constants/task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasksByTicketId(ticketId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { ticketId } });
  }

  async findTaskById(id: string): Promise<Task> {
    const ticket = this.taskRepository.findOne({ where: { id } });
    if (!ticket) {
      return null;
    }
    return ticket;
  }

  async create(
    ticket: Partial<CreateTaskDto>,
    currentAdminId: string,
  ): Promise<Task> {
    const ticketEntity: Partial<Task> = {
      id: uuidv7(),
      code: ticket.code,
      ticketId: ticket.ticketId,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status ? ticket.status : TaskStatus.OPEN_STATUS,
      startDate: ticket.startDate ? ticket.startDate : null,
      dueDate: ticket.dueDate ? ticket.dueDate : null,
      storyPoints: ticket.storyPoints ? ticket.storyPoints : null,
      assigneeId: ticket.assigneeId,
      sprint: ticket.sprint ? ticket.sprint : null,
      createdBy: currentAdminId,
      updatedBy: currentAdminId,
    };
    const newTask = this.taskRepository.create(ticketEntity);
    return this.taskRepository.save(newTask);
  }

  async update(
    id: string,
    ticket: Partial<UpdateTaskDto>,
    currentAdminId: string,
  ): Promise<Task> {
    const updateData: Partial<Task> = {
      ...ticket,
      updatedBy: currentAdminId,
    };

    await this.taskRepository.update(id, updateData);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

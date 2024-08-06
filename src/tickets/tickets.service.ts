import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from 'src/db/entities/ticket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v7 as uuidv7 } from 'uuid';
import { TaskStatus } from 'src/constants/task-status.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketsByProjectId(projectId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { projectId } });
  }

  async findTicketById(id: string): Promise<Ticket> {
    const ticket = this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      return null;
    }
    return ticket;
  }

  async create(
    ticket: Partial<CreateTicketDto>,
    currentAdminId: string,
  ): Promise<Ticket> {
    const ticketEntity: Partial<Ticket> = {
      id: uuidv7(),
      code: ticket.code,
      projectId: ticket.projectId,
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
    const newTicket = this.ticketRepository.create(ticketEntity);
    return this.ticketRepository.save(newTicket);
  }

  async update(
    id: string,
    ticket: Partial<UpdateTicketDto>,
    currentAdminId: string,
  ): Promise<Ticket> {
    const updateData: Partial<Ticket> = {
      ...ticket,
      updatedBy: currentAdminId,
    };

    await this.ticketRepository.update(id, updateData);
    return this.ticketRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}

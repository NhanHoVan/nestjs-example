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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FindByIdDto } from 'src/shared/dto/validator.dto';
import { Ticket } from 'src/db/entities/ticket.entity';
import { systemUserId } from 'src/constants/utils';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('project/:id')
  async getTicketsByProjectId(@Param() params: FindByIdDto): Promise<Ticket[]> {
    return await this.ticketsService.getTicketsByProjectId(params.id);
  }

  @Get(':id')
  async getProjectById(@Param() params: FindByIdDto): Promise<Ticket> {
    const ticket = await this.ticketsService.findTicketById(params.id);
    if (ticket === null) {
      throw new NotFoundException('Ticket does not exist!');
    } else {
      return ticket;
    }
  }

  @Post()
  async createProject(
    @Body() ticket: CreateTicketDto,
    // @Req() req: Request,
  ): Promise<Ticket> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    return this.ticketsService.create(ticket, systemUserId);
  }

  @Patch(':id')
  async updateProject(
    @Param() params: FindByIdDto,
    @Body() ticket: UpdateTicketDto,
    // @Req() req: Request,
  ): Promise<Ticket> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    const checkTicketId = await this.ticketsService.findTicketById(params.id);
    if (checkTicketId === null) {
      throw new NotFoundException('Ticket does not exist!');
    }
    return this.ticketsService.update(params.id, ticket, systemUserId);
  }

  @Delete(':id')
  async deleteTicketById(@Param() params: FindByIdDto): Promise<any> {
    const ticket = await this.ticketsService.findTicketById(params.id);
    if (ticket === null) {
      throw new NotFoundException('Ticket does not exist!');
    }
    return this.ticketsService.delete(params.id);
  }
}

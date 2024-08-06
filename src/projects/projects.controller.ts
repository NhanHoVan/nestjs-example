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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindByIdDto } from 'src/shared/dto/validator.dto';
import { Project } from 'src/db/entities/project.entity';
import { systemUserId } from 'src/constants/utils';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('organization/:id')
  async getProjectsByOrganizationId(
    @Param() params: FindByIdDto,
  ): Promise<Project[]> {
    return await this.projectsService.getProjectsByOrganizationId(params.id);
  }

  @Get(':id')
  async getProjectById(@Param() params: FindByIdDto): Promise<Project> {
    const project = await this.projectsService.findProjectById(params.id);
    if (project === null) {
      throw new NotFoundException('Project does not exist!');
    } else {
      return project;
    }
  }

  @Post()
  async createProject(
    @Body() project: CreateProjectDto,
    // @Req() req: Request,
  ): Promise<Project> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    return this.projectsService.create(project, systemUserId);
  }

  @Patch(':id')
  async updateProject(
    @Param() params: FindByIdDto,
    @Body() project: UpdateProjectDto,
    // @Req() req: Request,
  ): Promise<Project> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    const checkUserId = await this.projectsService.findProjectById(params.id);
    if (checkUserId === null) {
      throw new NotFoundException('Project does not exist!');
    }
    return this.projectsService.update(params.id, project, systemUserId);
  }

  @Delete(':id')
  async deleteProjectById(@Param() params: FindByIdDto): Promise<any> {
    const user = await this.projectsService.findProjectById(params.id);
    if (user === null) {
      throw new NotFoundException('Project does not exist!');
    }
    return this.projectsService.delete(params.id);
  }
}

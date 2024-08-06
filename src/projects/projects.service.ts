import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/db/entities/project.entity';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ProjectStatus } from 'src/constants/project-status.enum';
import { ProjectType } from 'src/constants/project-type.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async getProjectsByOrganizationId(
    organizationId: string,
  ): Promise<Project[]> {
    return this.projectRepository.find({ where: { organizationId } });
  }

  async findProjectById(id: string): Promise<Project> {
    const project = this.projectRepository.findOne({ where: { id } });
    if (!project) {
      return null;
    }
    return project;
  }

  async create(
    project: Partial<CreateProjectDto>,
    currentAdminId: string,
  ): Promise<Project> {
    const projectEntity: Partial<Project> = {
      id: uuidv7(),
      name: project.name,
      code: project.code,
      organizationId: project.organizationId,
      description: project.description,
      startDate: project.startDate ? project.startDate : null,
      endDate: project.endDate ? project.endDate : null,
      projectManagerId: project.projectManagerId,
      status: project.status ? project.status : ProjectStatus.START_STATUS,
      type: project.type ? project.type : ProjectType.RESEARCH_TYPE,
      tags: project.tags ? project.tags : null,
      createdBy: currentAdminId,
      updatedBy: currentAdminId,
    };
    const newProject = this.projectRepository.create(projectEntity);
    return this.projectRepository.save(newProject);
  }

  async update(
    id: string,
    project: Partial<UpdateProjectDto>,
    currentAdminId: string,
  ): Promise<Project> {
    const updateData: Partial<Project> = {
      ...project,
      updatedBy: currentAdminId,
    };

    await this.projectRepository.update(id, updateData);
    return this.projectRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}

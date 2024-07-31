import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/constants/status.enum';
import { Organization } from 'src/db/entities/organization.entity';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async fetchAllOrganization(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOrganizationById(id: string): Promise<Organization> {
    const organization = this.organizationRepository.findOne({ where: { id } });
    if (!organization) {
      return null;
    }
    return organization;
  }

  async create(
    organization: Partial<Organization>,
    currentAdminId: string,
  ): Promise<Organization> {
    const organizationEntity: Partial<Organization> = {
      id: uuidv7(),
      name: organization.name,
      avatarUrl: organization.avatarUrl ? organization.avatarUrl : null,
      status: organization.status ? organization.status : Status.INVITED_STATUS,
      address: organization.address ? organization.address : null,
      createdBy: currentAdminId,
      updatedBy: currentAdminId,
    };
    const newOrganization =
      this.organizationRepository.create(organizationEntity);
    return this.organizationRepository.save(newOrganization);
  }

  async update(
    id: string,
    organization: Partial<Organization>,
    currentAdminId: string,
  ): Promise<Organization> {
    const updateData: Partial<Organization> = {
      ...organization,
      updatedBy: currentAdminId,
    };

    await this.organizationRepository.update(id, updateData);
    return this.organizationRepository.findOne({ where: { id } });
  }
}

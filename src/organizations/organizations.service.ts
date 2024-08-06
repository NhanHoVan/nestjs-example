import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/db/entities/organization.entity';
import { UserService } from 'src/users/users.service';
import { DataSource, Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/constants/role.enum';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { User } from 'src/db/entities/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private dataSource: DataSource,
    private userService: UserService,
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
    organization: Partial<CreateOrganizationDto>,
    currentAdminId: string,
  ): Promise<Organization> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const organizationId = uuidv7();
      const organizationEntity: Partial<Organization> = {
        id: organizationId,
        name: organization.name,
        avatarUrl: organization.avatarUrl ? organization.avatarUrl : null,
        address: organization.address ? organization.address : null,
        createdBy: currentAdminId,
        updatedBy: currentAdminId,
      };

      const newOrganization = queryRunner.manager.create(
        Organization,
        organizationEntity,
      );
      const savedOrganization = await queryRunner.manager.save(newOrganization);

      const createUserDto: CreateUserDto = {
        name: organization.ownerName,
        email: organization.ownerEmail,
        organizationId: organizationId,
        role: Role.OWNER_ROLE,
        avatarUrl: null,
      };

      const userEntity = await this.userService.create(
        createUserDto,
        currentAdminId,
      );
      await queryRunner.manager.save(userEntity);

      await queryRunner.commitTransaction();
      return savedOrganization;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: string,
    organization: Partial<UpdateOrganizationDto>,
    currentAdminId: string,
  ): Promise<Organization> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const updateOrganization: Partial<Organization> = {
        ...organization,
        updatedBy: currentAdminId,
      };

      await queryRunner.manager.update(Organization, id, updateOrganization);

      let ownerUser: User;

      if (organization.isCreatOwner) {
        const createUserDto: CreateUserDto = {
          name: organization.ownerName,
          email: organization.ownerEmail,
          organizationId: id,
          avatarUrl: null,
          role: Role.OWNER_ROLE,
        };
        ownerUser = await this.userService.create(
          createUserDto,
          currentAdminId,
        );
        await queryRunner.manager.save(ownerUser);
      } else {
        ownerUser = await this.userService.findUserById(organization.ownerId);
        if (!ownerUser) {
          throw new NotFoundException('User does not exist!');
        }
        ownerUser.role = Role.OWNER_ROLE;
        await queryRunner.manager.save(ownerUser);
      }

      await queryRunner.commitTransaction();

      return this.organizationRepository.findOne({ where: { id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

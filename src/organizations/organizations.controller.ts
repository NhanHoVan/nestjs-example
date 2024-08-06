import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from 'src/db/entities/organization.entity';
import { FindByIdDto } from 'src/shared/dto/validator.dto';
import { systemUserId } from 'src/constants/utils';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  //fetch all organizations
  @Get()
  async fetchAllOrganization(): Promise<Organization[]> {
    return await this.organizationsService.fetchAllOrganization();
  }

  //get organization by id
  @Get(':id')
  async getOrganizationById(
    @Param() params: FindByIdDto,
  ): Promise<Organization> {
    const organization = await this.organizationsService.findOrganizationById(
      params.id,
    );
    if (organization === null) {
      throw new NotFoundException('Organization does not exist!');
    } else {
      return organization;
    }
  }

  //create organization
  @Post()
  async createOrganization(
    @Body() organization: CreateOrganizationDto,
    // @Req() req: Request,
  ): Promise<Organization> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    return this.organizationsService.create(organization, systemUserId);
  }

  //update organization
  @Put(':id')
  async updateOrganization(
    @Param() params: FindByIdDto,
    @Body() organization: Organization,
    // @Req() req: Request,
  ): Promise<any> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    const checkOrganizationId =
      await this.organizationsService.findOrganizationById(params.id);
    if (checkOrganizationId === null) {
      throw new NotFoundException('Organization does not exist!');
    }
    return this.organizationsService.update(
      params.id,
      organization,
      systemUserId,
    );
  }
}

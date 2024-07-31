import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../db/entities/user.entity';
import { FindByIdDto } from 'src/shared/dto/validator.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { systemUserId } from 'src/constants/utils';

@Controller('users')
// @UseGuards(RolesGuard)
// @Roles(Role.MANAGER_ROLE)
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //fetch all users
  @Get()
  async fetchAllUser(): Promise<User[]> {
    return await this.usersService.fetchAllUser();
  }

  //get user by id
  @Get(':id')
  async getUserById(@Param() params: FindByIdDto): Promise<User> {
    const user = await this.usersService.findUserById(params.id);
    if (user === null) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async createUser(
    @Body() user: CreateUserDto,
    // @Req() req: Request,
  ): Promise<User> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    return this.usersService.create(user, systemUserId);
  }

  //update user
  @Put(':id')
  async updateUser(
    @Param() params: FindByIdDto,
    @Body() user: UpdateUserDto,
    // @Req() req: Request,
  ): Promise<any> {
    // const currentAdminId = req['currentAdminId']
    //   ? req['currentAdminId']
    //   : systemUserId;
    const checkUserId = await this.usersService.findUserById(params.id);
    if (checkUserId === null) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.update(params.id, user, systemUserId);
  }

  //delete user
  @Delete(':id')
  async deleteUserById(@Param() params: FindByIdDto): Promise<any> {
    const user = await this.usersService.findUserById(params.id);
    if (user === null) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(params.id);
  }
}

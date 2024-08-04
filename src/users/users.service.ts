import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v7 as uuidv7 } from 'uuid';
import { Status } from 'src/constants/status.enum';
import { Role } from 'src/constants/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async fetchAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    user: Partial<CreateUserDto>,
    currentAdminId: string,
  ): Promise<User> {
    if (!user.name || !user.email || !user.organizationId) {
      throw new BadRequestException();
    }
    const userEntity: Partial<User> = {
      id: uuidv7(),
      name: user.name,
      email: user.email,
      organizationId: user.organizationId,
      avatarUrl: user.avatarUrl ? user.avatarUrl : null,
      status: Status.INVITED_STATUS,
      role: user.role ? user.role : Role.MEMBER_ROLE,
      createdBy: currentAdminId,
      updatedBy: currentAdminId,
    };
    const newUser = this.userRepository.create(userEntity);
    return this.userRepository.save(newUser);
  }

  async update(
    id: string,
    user: Partial<UpdateUserDto>,
    currentAdminId: string,
  ): Promise<User> {
    const updateData: Partial<User> = {
      ...user,
      updatedBy: currentAdminId,
    };

    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

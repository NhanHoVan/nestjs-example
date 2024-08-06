import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Task } from 'src/db/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

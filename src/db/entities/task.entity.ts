import { TaskStatus } from 'src/constants/task-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', length: 12, nullable: false })
  code: string;

  @Column({ name: 'ticket_id', type: 'uuid', nullable: false })
  ticketId: string;

  @Column({ name: 'title', length: 60, nullable: false })
  title: string;

  @Column({ name: 'description', length: 1000, nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN_STATUS,
  })
  status: TaskStatus;

  @Column({ type: 'timestamptz', name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ type: 'int', name: 'story_points', nullable: true })
  storyPoints: number;

  @Column({ name: 'assignee_id', type: 'uuid', nullable: true })
  assigneeId: string;

  @Column({ name: 'sprint', length: 100, nullable: true })
  sprint: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'uuid', name: 'created_by', nullable: false })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'uuid', name: 'updated_by', nullable: false })
  updatedBy: string;
}

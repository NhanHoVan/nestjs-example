import { Role } from 'src/constants/role.enum';
import { Status } from 'src/constants/status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid', nullable: false })
  organizationId: string;

  @Column({ name: 'email', length: 255, nullable: false })
  email: string;

  @Column({ name: 'name', length: 60, nullable: false })
  name: string;

  @Column({ name: 'avatar_url', length: 255, nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.INVITED_STATUS,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER_ROLE,
  })
  role: Role;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'uuid', name: 'created_by', nullable: false })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'uuid', name: 'updated_by', nullable: false })
  updatedBy: string;
}

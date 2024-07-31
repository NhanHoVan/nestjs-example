import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const dataSource = new DataSource({
  type: configService.get<string>('DB_TYPE') as any,
  host: configService.get<string>('PG_HOST'),
  port: parseInt(configService.get<string>('PG_PORT'), 10),
  username: configService.get<string>('PG_USER'),
  password: configService.get<string>('PG_PASSWORD'),
  database: configService.get<string>('PG_DB'),
  entities: [User, Organization],
  migrations: ['src/db/migration/**/*.ts'],
  synchronize: false,
});

export default dataSource;

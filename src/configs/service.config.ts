import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const serviceConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: +process.env.POSTGRES_PORT,
  entities: [process.cwd() + './src/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + './db/migrations/*.ts'],
  migrationsRun: false,
  migrationsTableName: 'migration',
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  dropSchema: false,
  logNotifications: true,
};

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const serviceConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  port: +process.env.POSTGRES_PORT as unknown as number,
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

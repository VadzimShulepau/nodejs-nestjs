import { DataSource } from 'typeorm';
import 'dotenv/config';

export const ormConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: +process.env.POSTGRES_PORT,
  entities: [process.cwd() + './src/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: [process.cwd() + './db/migrations/*.ts'],
  migrationsTableName: 'migration',
});

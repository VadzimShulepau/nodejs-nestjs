import { DataSource } from 'typeorm';
import 'dotenv/config';

export const ormConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  port: +process.env.POSTGRES_PORT as unknown as number,
  entities: [process.cwd() + './src/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + './db/migrations/*.ts'],
  migrationsTableName: 'migration',
});

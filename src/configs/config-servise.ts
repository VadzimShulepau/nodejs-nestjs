import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const configService = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  password: process.env.POSTGRES_PASSWORD as string,
  username: process.env.POSTGRES_USER as string,
  database: process.env.POSTGRES_DB as string,
  port: +process.env.POSTGRES_PORT as unknown as number,
  entities: [process.cwd() + './src/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  // migrationsRun: false,
  // migrations: ['./**/migrations/*{.ts,.js}'],
  //migrationsTableName: 'migrations',
});

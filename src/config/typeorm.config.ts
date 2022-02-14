import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'taskmanagement',
  username: 'postgres',
  password: 'postgres',
  entities: [__dirname + '/../**/*.entities.ts'],
  synchronize: true,
};

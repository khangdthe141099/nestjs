import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

console.log('test', path.resolve(__dirname, '..'));

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://realEstateDB_owner:yhvAK2Ig4mir@ep-dawn-credit-a12i04qo.ap-southeast-1.aws.neon.tech/realEstateDB?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

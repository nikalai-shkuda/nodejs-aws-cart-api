import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { dbConstants } from './config';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export const DB_CONNECTION_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  database: dbConstants.POSTGRES_DB,
  host: dbConstants.POSTGRES_HOST,
  password: dbConstants.POSTGRES_PASSWORD,
  port: Number(dbConstants.POSTGRES_PORT),
  username: dbConstants.POSTGRES_USER,
  entities: [Cart, CartItem, UserEntity],
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  logging: true,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS
  },
};

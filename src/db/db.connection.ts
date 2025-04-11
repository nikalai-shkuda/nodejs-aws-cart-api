import path from 'path';
import { CartItemEntity } from 'src/cart/entities/cart-item.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/cart/entities/product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { dbConstants } from './config';

export const DB_CONNECTION_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  database: dbConstants.POSTGRES_DB,
  host: dbConstants.POSTGRES_HOST,
  password: dbConstants.POSTGRES_PASSWORD,
  port: Number(dbConstants.POSTGRES_PORT),
  username: dbConstants.POSTGRES_USER,
  entities: [
    CartEntity,
    CartItemEntity,
    OrderEntity,
    ProductEntity,
    UserEntity,
  ],
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  logging: true,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS
  },
};

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { DB_CONNECTION_OPTIONS } from './db/db.connection';
import { OrderModule } from './order/order.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DB_CONNECTION_OPTIONS,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    CartModule,
    OrderModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

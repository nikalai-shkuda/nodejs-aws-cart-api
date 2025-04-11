import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from './entities/product.entity';
import { CartService } from './services';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity]),
  ],
  exports: [CartService],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => CartModule),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}

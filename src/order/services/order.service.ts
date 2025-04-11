import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/services';
import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderPayload, OrderResponse } from '../type';
import { CartStatuses } from 'src/cart/models';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll(): Promise<OrderResponse[]> {
    const orders = await this.orderRepository.find({
      relations: ['cart', 'cart.items'],
    });

    return orders.map((order) => ({
      id: order.id,
      address: order.address,
      items: order?.cart?.items
        ? order.cart.items.map((item) => ({
            productId: item.product_id,
            count: item.count,
          }))
        : [],
      statusHistory: [
        {
          status: order.status,
          timestamp: order.updated_at || null,
          comment: order.comments || '',
        },
      ],
    }));
  }

  async findById(orderId: string): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ id: orderId });
  }

  async create(data: CreateOrderPayload) {
    return this.dataSource.transaction(async (manager) => {
      const order = manager.create(OrderEntity, data);

      await manager.save(order);

      await this.cartService.updateCartStatus(
        order.cart_id,
        CartStatuses.ORDERED,
      );

      return order;
    });
  }

  // TODO add  type
  async update(orderId: string, data: OrderEntity) {
    await this.orderRepository.update(orderId, data);

    return this.findById(orderId);
  }
}

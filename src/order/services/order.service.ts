import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Order } from '../type';
import { CreateOrderPayload, OrderStatus } from '../type';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {};

  getAll() {
    const orders = Object.values(this.orders);
    return orders.map((order) => ({
      ...order,
      items: [],
    }));
  }

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  create(data: CreateOrderPayload) {
    const id = randomUUID() as string;
    const order: any = {
      id,
      ...data,
      statusHistory: [
        {
          comment: '',
          status: OrderStatus.Open,
          timestamp: Date.now(),
        },
      ],
    };

    this.orders[id] = order;

    return order;
  }

  // TODO add  type
  update(orderId: string, data: Order) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }
}

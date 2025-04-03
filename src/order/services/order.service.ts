import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderPayload } from '../type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async findById(orderId: string): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ id: orderId });
  }

  async create(data: CreateOrderPayload) {
    const order = this.orderRepository.create({
      ...data,
    });

    return this.orderRepository.save(order);
  }

  // TODO add  type
  async update(orderId: string, data: OrderEntity) {
    await this.orderRepository.update(orderId, data);

    return this.findById(orderId);
  }
}

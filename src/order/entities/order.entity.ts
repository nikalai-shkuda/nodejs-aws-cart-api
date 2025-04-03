import { CartEntity } from 'src/cart/entities/cart.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../type';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: false, default: {} })
  payment: {};

  @Column({ type: 'json', nullable: false, default: {} })
  delivery: {};

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Open })
  status: OrderStatus;

  @Column({ type: 'integer' })
  total: number;

  @ManyToOne(() => CartEntity, (cart) => cart.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

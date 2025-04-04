import { CartEntity } from 'src/cart/entities/cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address, OrderStatus } from '../type';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: true, default: {} })
  payment?: {};

  @Column({ type: 'json', nullable: false, default: {} })
  address: Address;

  @Column({ type: 'text', nullable: true })
  comments?: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Open })
  status?: OrderStatus;

  @Column({ type: 'integer' })
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => CartEntity, (cart) => cart.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartStatuses } from '../models';
import { CartItemEntity } from './cart-item.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  items: CartItemEntity[];

  @OneToMany(() => OrderEntity, (order) => order.cart, { cascade: true })
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

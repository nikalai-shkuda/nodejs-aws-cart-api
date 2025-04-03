import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'int', nullable: false })
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;
}

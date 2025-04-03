import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => CartEntity, (cart) => cart.user, { cascade: true })
  carts?: CartEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true })
  orders?: OrderEntity[];
}

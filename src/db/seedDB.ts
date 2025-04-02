import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CartStatuses } from '../cart';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { DB_CONNECTION_OPTIONS } from './db.connection';

console.log(111, DB_CONNECTION_OPTIONS);

const dataSource = new DataSource({
  ...DB_CONNECTION_OPTIONS,
});

const carts = [
  {
    id: uuidv4(),
    user_id: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
    status: CartStatuses.OPEN,
  },
  {
    id: uuidv4(),
    user_id: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
    status: CartStatuses.ORDERED,
  },
];

const cartItems = [
  {
    cart_id: carts[0].id,
    product_id: uuidv4(),
    count: 2,
  },
  {
    cart_id: carts[1].id,
    product_id: uuidv4(),
    count: 3,
  },
];

console.log({ carts, cartItems });

async function seedDatabase() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values(carts)
      .execute();

    console.log('Carts seeded');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(CartItem)
      .values(cartItems)
      .execute();

    console.log('Cart items seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    dataSource.destroy();
  }
}

seedDatabase();

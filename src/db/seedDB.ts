import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CartStatuses } from '../cart';
import { CartItemEntity } from '../cart/entities/cart-item.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../cart/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { DB_CONNECTION_OPTIONS } from './db.connection';

const dataSource = new DataSource({
  ...DB_CONNECTION_OPTIONS,
});

const userId = uuidv4();
const users = [
  {
    id: userId,
    name: 'test' + Date.now(),
    password: 'root',
  },
];

const products = [
  {
    id: uuidv4(),
    title: 'Product 1',
    description: 'description 1',
    price: 100,
  },
  {
    id: uuidv4(),
    title: 'Product 2',
    description: 'description 2',
    price: 25,
  },
];

const carts = [
  {
    id: uuidv4(),
    user_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
    status: CartStatuses.OPEN,
  },
  {
    id: uuidv4(),
    user_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
    status: CartStatuses.ORDERED,
  },
];

const cartItems = [
  {
    cart_id: carts[0].id,
    product_id: products[0].id,
    count: 2,
  },
  {
    cart_id: carts[0].id,
    product_id: products[1].id,
    count: 3,
  },
  {
    cart_id: carts[1].id,
    product_id: products[0].id,
    count: 3,
  },
];

console.log({ carts, cartItems, products, users });

async function seedDatabase() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(users)
      .execute();

    console.log('Users seeded');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values(products)
      .execute();
    console.log('Products seeded');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(CartEntity)
      .values(carts)
      .execute();

    console.log('Carts seeded');

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(CartItemEntity)
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

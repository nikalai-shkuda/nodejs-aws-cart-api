import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Cart, CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';
import { Cart as CartEntity } from '../entities/cart.entity';
import { CartItem as CartItemEntity } from '../entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    return this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
  }

  async createByUserId(userId: string): Promise<CartEntity> {
    const timestamp = new Date();

    const userCart = this.cartRepository.create({
      id: randomUUID(),
      user_id: userId,
      created_at: timestamp,
      updated_at: timestamp,
      status: CartStatuses.OPEN,
      items: [],
    });

    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    let userCart = await this.findByUserId(userId);

    if (!userCart) {
      userCart = await this.createByUserId(userId);
    }

    return userCart;
  }

  async findExistingCartItem(
    cart_id: string,
    product_id: string,
  ): Promise<CartItemEntity | undefined> {
    return await this.cartItemRepository.findOne({
      where: { cart_id, product_id },
    });
  }

  async addOrUpdateCartItem(
    cartId: string,
    productId: string,
    count: number,
  ): Promise<void> {
    const existingItem = await this.findExistingCartItem(cartId, productId);

    if (existingItem) {
      existingItem.count = count;
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cart_id: cartId,
        product_id: productId,
        count: count,
      });
      await this.cartItemRepository.save(newItem);
    }
  }

  async removeCartItem(item: CartItemEntity): Promise<void> {
    await this.cartItemRepository.remove(item);
  }

  async updateByUserId(
    userId: string,
    payload: PutCartPayload,
  ): Promise<CartEntity> {
    const userCart = await this.findOrCreateByUserId(userId);

    const existingItem = await this.findExistingCartItem(
      userCart.id,
      payload.product.id,
    );

    if (payload.count > 0) {
      await this.addOrUpdateCartItem(
        userCart.id,
        payload.product.id,
        payload.count,
      );
    } else if (payload.count === 0 && existingItem) {
      await this.removeCartItem(existingItem);
    }

    return await this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      await this.cartRepository.delete(userCart.id);
    }
  }
}

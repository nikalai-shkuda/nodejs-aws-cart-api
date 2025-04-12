import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { BasicAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { CartItem } from './models';
import { CreateOrderDto, Order, PutCartPayload } from 'src/order/type';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  findUserCart(@Req() req: AppRequest): CartItem[] {
    const cart = this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return cart.items;
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  updateUserCart(
    @Req() req: AppRequest,
    @Body() body: PutCartPayload,
  ): CartItem[] {
    // TODO: validate body payload...
    const cart = this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return cart.items;
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put('order')
  checkout(@Req() req: AppRequest, @Body() body: CreateOrderDto) {
    const userId = getUserIdFromRequest(req);
    const cart = this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      throw new BadRequestException('Cart is empty');
    }

    const { id: cartId } = cart;
    const order = this.orderService.create({
      user_id: userId,
      cart_id: cartId,
      address: body.address,
    });
    this.cartService.removeByUserId(userId);

    return {
      order,
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('order')
  getOrder(): Order[] {
    return this.orderService.getAll();
  }
}

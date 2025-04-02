import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  AuthService,
  // JwtAuthGuard,
  BasicAuthGuard,
  LocalAuthGuard,
} from './auth';
import { AppRequest } from './shared';
import { UserEntity } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get(['', 'ping'])
  healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @Post('api/auth/register')
  @HttpCode(HttpStatus.CREATED)
  // TODO ADD validation
  async register(@Body() body: UserEntity) {
    return await this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('api/auth/login')
  async login(@Request() req: AppRequest) {
    const token = this.authService.login(req.user, 'basic');

    return token;
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req: AppRequest) {
    return {
      user: req.user,
    };
  }
}

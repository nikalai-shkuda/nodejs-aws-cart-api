import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(name: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { name } });
    return user;
  }

  async createOne({ name, password }: UserEntity): Promise<UserEntity> {
    const id = randomUUID();
    const newUser = this.userRepository.create({ id, name, password });
    const user = await this.userRepository.save(newUser);
    return user;
  }
}

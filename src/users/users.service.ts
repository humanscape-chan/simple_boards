import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create({
    name,
    email,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    const user = this.repo.create({ name, email, password });
    await this.repo.save(user);
    return user;
  }

  async delete(id: number | null) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error('user not found');
    }
    await this.repo.remove(user);
    return user;
  }

  async update(
    id: number,
    {
      email,
      name,
      password,
    }: { email: string; name: string; password: string },
  ) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error('user not found');
    }
    user.email = email;
    user.name = name;
    user.password = password;
    await this.repo.save(user);
    return user;
  }

  async findOne(id: number) {
    if (!id) return null;
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  async findAll(ids: number[]) {
    const users = await this.repo.find({
      where: {
        id: In(ids),
      },
    });
    return users;
  }
}

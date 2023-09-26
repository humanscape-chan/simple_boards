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
    const user = await this.repo.create({ name, email, password });
    return this.repo.save(user);
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
    return this.repo.remove(user);
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
    return this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({
      where: {
        email,
      },
    });
  }

  async findAll(ids: number[]) {
    return await this.repo.find({
      where: {
        id: In(ids),
      },
    });
  }
}

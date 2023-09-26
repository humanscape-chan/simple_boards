import { User } from './users.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    // check email duplication
    const user: User = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt: string = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword: string = salt + '.' + hash.toString('hex');

    const createdUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return createdUser;
  }

  async signin({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('user not found');
    }
    return user;
  }
}

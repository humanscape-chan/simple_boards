import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Post,
  Session,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurerrentUserInterCeptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.gaurd';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurerrentUserInterCeptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signUp')
  async signUp(@Session() session: any, @Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  @Post('/signIn')
  async signIn(@Session() session: any, @Body() body: LoginUserDto) {
    const user = await this.authService.signin(body);
    return user;
  }

  @Post('/signOut')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Param('ids') ids: string) {
    const idArr = ids.split(',').map((id) => parseInt(id));
    const users = await this.userService.findAll(idArr);
    return users;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userService.delete(parseInt(id));
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(parseInt(id), body);
    return user;
  }
}

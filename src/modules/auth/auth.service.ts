import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<string> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new BadRequestException('Username or password is incorrect');
    }
    console.log(user);
    if (!user.password) {
      throw new BadRequestException('Invalid password');
    }
    const isMatch = bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }
    const payload = { sub: user.id, username: user.username };

    return await this.jwtService.signAsync(payload);
  }

  async signUp(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new BadRequestException('username or password is incorrect');
    }
    if (!user.password) {
      throw new BadRequestException('Invalid password');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }
}

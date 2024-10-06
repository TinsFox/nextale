import {
  Body,
  Controller,
  Post,
  UseGuards,
  Response,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user-dto';

import { COOKIE_NAME } from '~/common/constants';
import { LoginDto } from './dto/login-dto';

import { Public } from '~/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() signInDto: LoginDto, @Response() res: any) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true });
    return res.json({ token, message: 'login success' });
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('logout')
  logout(@Response() res: any) {
    res.clearCookie(COOKIE_NAME);
    return res.json({ message: 'logout success' });
  }
}

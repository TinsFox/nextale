import { Body, Controller, Post, Response, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user-dto';

import { COOKIE_NAME } from '~/common/constants';
import { LoginDto } from './dto/login-dto';

import { Public } from '~/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response as ExpressResponse } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login' })
  async login(
    @Body() signInDto: LoginDto,
    @Response() response: ExpressResponse,
  ) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie(COOKIE_NAME, token, { httpOnly: true, secure: true });
    const loginResponse = {
      code: 200,
      data: { token },
      message: 'login success',
    };
    return response.json(loginResponse);
  }

  @Public()
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ type: CreateUserDto })
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ type: Object })
  logout(@Response() res: any) {
    res.clearCookie(COOKIE_NAME);
    return res.json({ code: 200, message: 'logout success' });
  }
}

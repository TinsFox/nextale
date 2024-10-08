import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '~/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { UserPayload } from '~/types/user.auth';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of the current user' })
  getProfile(@User() user: UserPayload) {
    return this.usersService.queryCurrentUser(user.userId);
  }
}

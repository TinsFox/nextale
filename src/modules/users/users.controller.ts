import { Public } from '~/common/decorators/public.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '~/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { UserPayload } from '~/types/user.auth';
import { UserProfile } from './entities/profile.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of the current user' })
  @ApiResponse({ type: UserProfile })
  getProfile(@User() user: UserPayload) {
    return this.usersService.queryCurrentUser(user.userId);
  }

  @Public()
  @Get('user-profile')
  @ApiOperation({ summary: 'Get the user profile' })
  @ApiResponse({ type: UserProfile })
  getSiteProfile() {
    return this.usersService.querySiteProfile();
  }
}

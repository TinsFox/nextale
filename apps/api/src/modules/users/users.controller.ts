import { Public } from 'apps/api/src/common/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'apps/api/src/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { UserPayload } from 'apps/api/src/types/user.auth';
import { UserProfile } from './entities/profile.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

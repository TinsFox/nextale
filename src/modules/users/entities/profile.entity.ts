import { ApiProperty } from '@nestjs/swagger';
import { SocialLink } from '~/modules/social-links/entities/social-link.entity';

export class UserProfile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ type: [SocialLink] })
  socialLinks: SocialLink[];
}

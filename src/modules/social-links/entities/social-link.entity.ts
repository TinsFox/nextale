import { ApiProperty } from '@nestjs/swagger';

export class SocialLink {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  url: string;
}

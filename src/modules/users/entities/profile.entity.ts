import { ApiProperty } from '@nestjs/swagger';

export class UserProfile {
  @ApiProperty({ description: 'The id of the user' })
  id: number;

  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The roles of the user' })
  roles: string[];

  @ApiProperty({ description: 'The time the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The last time the user was updated' })
  updatedAt: Date;
}

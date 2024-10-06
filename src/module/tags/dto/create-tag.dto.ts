import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Tag Name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

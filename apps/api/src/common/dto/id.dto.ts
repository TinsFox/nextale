import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class IDParams {
  @IsString()
  @Type(() => String)
  @ApiProperty({
    description: 'The ID of the resource to find',
    example: '1',
  })
  id: string;
}

import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class IDParams {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'The ID of the resource to find',
    example: 1,
  })
  id: number;
}

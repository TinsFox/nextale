import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'site config',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'value',
  })
  value: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'json|text',
  })
  type: string;
}

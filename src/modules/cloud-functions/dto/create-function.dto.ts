import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCloudFunctionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
  @ApiProperty()
  method: string;
}

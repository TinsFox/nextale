import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePageDto } from './create-page.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}

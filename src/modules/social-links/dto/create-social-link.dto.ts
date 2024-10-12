import { IsString, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSocialLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

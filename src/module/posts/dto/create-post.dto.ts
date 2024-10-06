import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PostStatus, PostStatusEnum } from '~/common/constants/post.constant';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @Length(1, 20)
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isCopyright?: boolean;

  @IsBoolean()
  @IsOptional()
  isTop?: boolean;

  @IsNumber()
  @IsOptional()
  topOrder?: number;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  customCreatedAt?: string;

  @IsString()
  @IsOptional()
  customUpdatedAt?: string;

  @IsArray()
  @IsOptional()
  relatedPosts?: string[];

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  status: PostStatus;
}

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
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
  coverImage: string;

  @IsArray()
  tags: string[];

  @IsBoolean()
  isCopyright: boolean;

  @IsBoolean()
  isTop: boolean;

  @IsNumber()
  topOrder: number;

  @IsString()
  summary: string;

  @IsString()
  customCreatedAt: string;

  @IsString()
  customUpdatedAt: string;

  @IsArray()
  relatedPosts: string[];

  @IsString()
  category: string;

  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  status: PostStatus;
}

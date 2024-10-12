import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'My first post',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is the content of my first post',
  })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/cover-image.jpg',
  })
  coverImage?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['tag1', 'tag2', 'tag3'],
  })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
  })
  isCopyright?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
  })
  isTop?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
  })
  topOrder?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This is the summary of my first post',
  })
  summary?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
  })
  customCreatedAt?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
  })
  customUpdatedAt?: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['post1', 'post2', 'post3'],
  })
  relatedPosts?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'My first category',
  })
  category?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'my-first-post',
  })
  slug?: string;

  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  @ApiProperty({
    example: 'draft',
  })
  status: PostStatus;
}

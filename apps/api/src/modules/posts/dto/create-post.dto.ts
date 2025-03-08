import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostStatus, PostStatusEnum } from 'apps/api/src/common/constants/post.constant';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My first post',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'This is the content of my first post',
    required: true,
  })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/cover-image.jpg',
    required: false,
  })
  coverImage: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['tag1', 'tag2', 'tag3'],
    required: false,
  })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isCopyright?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isTop?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    required: false,
  })
  topOrder?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This is the summary of my first post',
    required: false,
  })
  summary?: string;

  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
    required: false,
  })
  customCreatedAt?: Date;

  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
    required: false,
  })
  customUpdatedAt?: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['post1', 'post2', 'post3'],
    required: false,
  })
  relatedPosts?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'My first category',
    required: false,
  })
  category?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'my-first-post',
    required: false,
  })
  slug?: string;

  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  @ApiProperty({
    example: 'draft',
  })
  status: PostStatus;
}

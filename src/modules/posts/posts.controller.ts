import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '~/common/decorators/user.decorator';
import { UserPayload } from '~/types/user.auth';
import { PaginationQueryDto } from '~/common/dto/pagination-query.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '~/common/decorators/public.decorator';
import { PostStatus } from './types/post.types';

@ApiTags('Public/Posts')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of posts per page',
    example: 10,
  })
  findAll(@Query() query: PaginationQueryDto) {
    return this.postsService.findAll(query);
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get a post by slug' })
  findOneBySlug(@Param('slug') slug: string) {
    return this.postsService.findOneBySlug(slug);
  }

  @Public()
  @Get('/s/:id')
  @ApiOperation({ summary: 'Get a post by id' })
  findOneById(@Param('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePostDto })
  @ApiOperation({ summary: 'Update a post by id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update a post status by id' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: PostStatus,
    @User() user: UserPayload,
  ) {
    // 验证状态值是否有效
    const validStatuses: PostStatus[] = ['draft', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status value');
    }

    const post = await this.postsService.findOneById(id);

    // 检查文章是否存在
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // 检查用户是否有权限修改这篇文章
    if (post.authorId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to update this post',
      );
    }

    // 更新文章状态
    return this.postsService.update(id, { status });
  }
}

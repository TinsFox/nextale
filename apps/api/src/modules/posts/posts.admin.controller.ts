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
import { PostsAdminService } from './posts.admin.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'apps/api/src/common/decorators/user.decorator';
import { UserPayload } from 'apps/api/src/types/user.auth';
import { PaginationQueryDto } from 'apps/api/src/common/dto/pagination-query.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostStatus } from './types/post.types';

@ApiTags('Admin/Posts')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller('admin/posts')
export class PostsAdminController {
  constructor(private readonly postsAdminService: PostsAdminService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiBody({ type: CreatePostDto })
  @ApiOperation({ summary: 'Create a new post' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserPayload,
  ) {
    const record = await this.postsAdminService.create(
      user.userId,
      createPostDto,
    );
    return {
      message: 'Post created successfully',
      id: record[0].id,
    };
  }

  @Get()
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
    return this.postsAdminService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  findOneById(@Param('id') id: string) {
    return this.postsAdminService.findOneById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePostDto })
  @ApiOperation({ summary: 'Update a post by id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsAdminService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  remove(@Param('id') id: string) {
    return this.postsAdminService.remove(id);
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

    const post = await this.postsAdminService.findOneById(id);

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
    return this.postsAdminService.update(id, { status });
  }
}

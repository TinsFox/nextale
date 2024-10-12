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

@ApiTags('Posts')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiBody({ type: CreatePostDto })
  @ApiOperation({ summary: 'Create a new post' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserPayload,
  ) {
    const record = await this.postsService.create(1, createPostDto);
    return {
      message: 'Post created successfully',
      id: record[0].id,
    };
  }

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
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  findOne(@Param('id') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePostDto })
  @ApiOperation({ summary: 'Update a post by id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}

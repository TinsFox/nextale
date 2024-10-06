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
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiBody({ type: CreatePostDto })
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserPayload,
  ) {
    const record = await this.postsService.create(user.userId, createPostDto);
    return {
      message: 'Post created successfully',
      id: record[0].id,
    };
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  // @ApiBody({ type: UpdatePostDto })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}

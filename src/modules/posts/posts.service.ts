import { Inject, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '~/common/dto/pagination-query.dto';
import { PaginatedResult } from '~/common/interfaces/paginated-result.interface';
import { paginateQuery } from '~/common/helpers/pagination.helper';
import { postsTable } from '~/database/schema';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const post = await this.db
      .insert(postsTable)
      .values({ ...createPostDto, authorId: userId })
      .returning({
        id: postsTable.id,
      });
    return post;
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<any>> {
    return paginateQuery(this.db, postsTable, query);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log('updatePostDto: ', updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

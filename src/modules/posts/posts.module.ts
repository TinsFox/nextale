import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DrizzleModule } from '../database/database.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [DrizzleModule],
})
export class PostsModule {}

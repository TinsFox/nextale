import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsAdminController } from './posts.admin.controller';
import { DrizzleModule } from '../database/database.module';
import { PostsAdminService } from './posts.admin.service';

@Module({
  controllers: [PostsController, PostsAdminController],
  providers: [PostsService, PostsAdminService],
  imports: [DrizzleModule],
})
export class PostsModule {}

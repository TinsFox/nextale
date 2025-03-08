import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from '../health/health.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'apps/api/src/common/filters/http-exception.filter';
import { PostsModule } from '../posts/posts.module';
import { DrizzleModule } from '../database/database.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TagsModule } from '../tags/tags.module';
import { ProjectsModule } from '../projects/projects.module';
import { NotesModule } from '../notes/notes.module';
import { PagesModule } from '../pages/pages.module';
import { CategoriesModule } from '../categories/categories.module';
import { CloudFunctionsModule } from '../cloud-functions/cloud-functions.module';
import { FileModule } from '../file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_DIR } from 'apps/api/src/config/multer-config';
import { RedisModule } from '../redis/redis.module';
import { SettingsModule } from '../settings/settings.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_DIR,
      serveRoot: '/assets/',
      exclude: ['/api/(.*)'],
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    DrizzleModule,
    PostsModule,
    TagsModule,
    ProjectsModule,
    NotesModule,
    PagesModule,
    CategoriesModule,
    CloudFunctionsModule,
    FileModule,
    RedisModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

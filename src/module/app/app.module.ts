import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from '../health/health.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '~/common/filters/http-exception.filter';
import { PostsModule } from '../posts/posts.module';
import { DrizzleModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
    DrizzleModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

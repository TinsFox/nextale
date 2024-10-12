import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './modules/redis/redis.module';
import { SocialLinksModule } from './modules/social-links/social-links.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    RedisModule,
    SocialLinksModule,
  ],
})
export class AppModule {}

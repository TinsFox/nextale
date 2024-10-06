import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/modules/app/app.module';

import { migrateDatabase } from '~/modules/database/database.migrate';
import cookieParser from 'cookie-parser';

import { globalPrefix, isProduction } from './common/constants/env.constant';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { setupSwagger } from './common/middleware/swagger.middleware';

import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

const logger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (isProduction) {
    app.setGlobalPrefix(globalPrefix);
  }
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.useLogger(new Logger());

  app.enableCors();
  setupSwagger(app);

  await migrateDatabase();
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const pid = process.pid;
    logger.log(`Process ID is ${pid}`);
    logger.log(`Server is running on ${url}`);
    logger.log(`Global Prefix is ${globalPrefix}`);
    logger.log(
      `Scalar document is running on ${url}/${globalPrefix}/api-reference`,
    );
    logger.log(
      `Swagger document is running on ${url}/${globalPrefix}/api-docs`,
    );
  });
}
bootstrap();

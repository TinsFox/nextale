import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'apps/api/src/modules/app/app.module';

import { migrateDatabase } from 'apps/api/src/modules/database/database.migrate';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from 'apps/api/src/config/multer-config';
import { globalPrefix, isProduction } from 'apps/api/src/common/constants/env.constant';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { setupSwagger } from 'apps/api/src/common/middleware/swagger.middleware';

import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from 'apps/api/src/common/interceptors/logging.interceptor';
import { existsSync, mkdirSync } from 'fs';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

const logger = new Logger('bootstrap');

async function prepare() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (isProduction) {
    app.setGlobalPrefix(globalPrefix);
  }

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.useLogger(new Logger());

  setupSwagger(app);

  await migrateDatabase();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  await prepare();

  await app.listen(8080, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const pid = process.pid;
    logger.log(`Process ID is ${pid}`);
    logger.log(`Server is running on ${url}`);
    globalPrefix && logger.log(`Global Prefix is ${globalPrefix}`);
    logger.log(
      `Scalar document is running on ${url}${globalPrefix ? `${globalPrefix}` : ''}/api-reference`,
    );
    logger.log(
      `Swagger document is running on ${url}${globalPrefix ? `${globalPrefix}` : ''}/api-docs`,
    );
  });
}
bootstrap();

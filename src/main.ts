import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/module/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { migrateDatabase } from '~/database/database.migrate';
import cookieParser from 'cookie-parser';

import { isProduction } from './common/constants/env.constant';

const globalPrefix = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (isProduction) {
    app.setGlobalPrefix(globalPrefix);
  }

  const config = new DocumentBuilder()
    .setTitle('NexTale')
    .setDescription('NexTale API description')
    .setVersion('1.0')
    .addTag('NexTale')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    `${isProduction ? globalPrefix : ''}/api-docs`,
    app,
    document,
  );

  app.use(cookieParser());

  app.enableCors();

  app.use(
    `${isProduction ? globalPrefix : ''}/api-reference`,
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  await migrateDatabase();

  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const pid = process.pid;
    console.log(`Process ID is ${pid}`);
    console.log(`Server is running on ${url}`);
    console.log(`Global Prefix is ${globalPrefix}`);
    console.log(
      `Scalar API Reference is running on ${url}/${
        isProduction ? globalPrefix : ''
      }api-reference`,
    );
    console.log(
      `Swagger document is running on ${url}/${
        isProduction ? globalPrefix : ''
      }api-docs`,
    );
  });
}
bootstrap();

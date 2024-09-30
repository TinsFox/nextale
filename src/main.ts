import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/module/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { migrateDatabase } from '~/database/database.migrate';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const globalPrefix = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('NexTale')
    .setDescription('NexTale API description')
    .setVersion('1.0')
    .addTag('NexTale')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${globalPrefix}/api-docs`, app, document);

  app.use(cookieParser());

  app.enableCors();

  app.use(
    `/${globalPrefix}/api-reference`,
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
      `Scalar API Reference is running on ${url}/${globalPrefix}/api-reference`,
    );
    console.log(
      `Swagger document is running on ${url}/${globalPrefix}/api-docs`,
    );
  });
}
bootstrap();

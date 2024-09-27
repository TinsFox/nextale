import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NexTale')
    .setDescription('NexTale API description')
    .setVersion('1.0')
    .addTag('NexTale')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

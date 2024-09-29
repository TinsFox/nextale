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

  app.enableCors();

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl();

    const pid = process.pid;
    console.log(`Process ID is ${pid}`);
    console.log(`Server is running on ${url}`);
    console.log(`Scalar API Reference is running on ${url}/reference`);
    console.log(`Swagger document is running on ${url}/api`);
  });
}
bootstrap();

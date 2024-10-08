import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { globalPrefix } from '~/common/constants/env.constant';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NexTale')
    .setDescription('NexTale API description')
    .setContact('NexTale', 'https://nextale.com', 'contact@nextale.com')
    .setVersion('1.0')
    .addTag('NexTale')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${globalPrefix}/api-docs`, app, document);

  app.use(`${globalPrefix}/openapi.json`, (req, res) => {
    res.json(document);
  });

  app.use(
    `${globalPrefix}/api-reference`,
    apiReference({
      theme: 'kepler',
      showSidebar: true,
      authentication: {
        type: 'bearer',
        name: 'Authorization',
        in: 'header',
      },
      spec: {
        content: document,
        // url: `${globalPrefix}/openapi.json`,
      },
    }),
  );
  return document;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
    cors: true
  });

  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('A App')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix("api");

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();

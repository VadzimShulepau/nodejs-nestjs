import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 4000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({ credentials: true });

  const yaml = new DocumentBuilder()
    .setTitle('api service')
    .setDescription('music library')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, yaml);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
  });
}
bootstrap();

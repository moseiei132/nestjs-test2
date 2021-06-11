import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  const swagger = new DocumentBuilder()
    .setTitle('nestjs-test')
    .setDescription('เทสครับ ไอ้ต้าว')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('api', app, document)

  const config = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.get('port'))
}
bootstrap();

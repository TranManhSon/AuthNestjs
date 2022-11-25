import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session'
import * as passport from 'passport'
import secretSession from './config/secretSession.config'
import secretSessionConfig from './config/secretSession.config';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: secretSessionConfig().secretSession,
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 3600000 },
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen( process.env.PORT || 3000);
}
bootstrap();
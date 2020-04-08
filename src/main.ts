import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/error/filters/http-exception.filter';
import { ApiParamsValidationPipe } from './common/error/pipe/api-params-validation.pipe';
import * as compression from 'compression';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
  }));
  // 允许跨域
  app.enableCors();
  app.useStaticAssets(join(__dirname, '.', 'public'));
  app.setBaseViewsDir(join(__dirname, '.', 'views'));
  app.setViewEngine('ejs');
  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.startAllMicroservicesAsync();
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.setGlobalPrefix(config.globalPrefix);
  await app.listen(config.port);
}
bootstrap();

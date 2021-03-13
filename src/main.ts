import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/error/filters/http-exception.filter';
import { ApiParamsValidationPipe } from './common/error/pipe/api-params-validation.pipe';
import * as compression from 'compression';
import {config} from './config/config.json';

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
// docker build  -t simple-user-center-server:1.0 .
// docker tag 22b3e74fb903 canyuegongzi/simple-user-center-server:1.0
// docker push canyuegongzi/simple-user-center-server:1.0
// docker run -itd --name simplenoticeapi -p 10001:10001 -p 10002:10002 --restart=on-failure:3 72300a873c2c
// docker run -itd --restart=on-failure:3 --name zeebe -p 26400-26404:26500-26504 camunda/zeebe:latest
// docker build  -t gateway:1.0 .
// docker run -itd --name simple-user-center-server -p 8881:8881 -e MYSQL="148.70.150.131" -e MYSQL_PASSWORD="123Ad123Ad" -e MYSQL_USER="root" --restart=on-failure:3 22b3e74fb903



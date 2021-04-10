import { Module, CacheInterceptor } from '@nestjs/common';
import { MainModule } from './MainModule';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ MainModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, CacheInterceptor } from '@nestjs/common';
import { MainModule } from './main.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ MainModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

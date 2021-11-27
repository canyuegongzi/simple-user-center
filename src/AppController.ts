import {Controller, Get, Inject} from '@nestjs/common';
import { AppService } from './AppService';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ip')
  getIp(): any {
    return {
      data: '5555',
      code: 200,
    };
  }
}

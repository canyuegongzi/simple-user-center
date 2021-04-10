import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      data: 'hello',
      code: 200,
    };
  }
}

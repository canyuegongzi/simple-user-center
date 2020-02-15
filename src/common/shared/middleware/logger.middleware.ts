import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // @ts-ignore
    console.log(`[${context}] Request...`);
    next();
  }
}

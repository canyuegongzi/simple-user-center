import {
  CallHandler,
  ExecutionContext, Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserService} from '../../../service/UserService';
import {AuthService} from '../../auth/AuthService';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      // tslint:disable-next-line: no-console
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

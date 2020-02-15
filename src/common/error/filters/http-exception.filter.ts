import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        if (exception instanceof ApiException) {
            response
                .status(status)
                .json({
                    errorCode: exception.getErrorCode(),
                    errorMessage: exception.getErrorMessage(),
                    date: new Date().toLocaleDateString(),
                    path: request.url,
                });

        } else {

            response
                .status(status)
                .json({
                    statusCode: status,
                    errorMessage: 'token无效',
                    date: new Date().toLocaleDateString(),
                    path: request.url,
                });
        }
    }

}

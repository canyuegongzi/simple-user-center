import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../../config/api-error-code.enum';
export declare class ApiException extends HttpException {
    private readonly errorMessage;
    private readonly errorCode;
    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus);
    getErrorCode(): ApiErrorCode;
    getErrorMessage(): string;
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class ApiException extends HttpException {

    private readonly errorMessage: string;
    private readonly errorCode: ApiErrorCode;

    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus) {

        super(errorMessage, statusCode);

        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}

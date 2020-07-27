import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ApiParamsValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
}

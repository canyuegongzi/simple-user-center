import {IsNotEmpty} from 'class-validator';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class AddUserDto {
    @IsNotEmpty({ message: '组织id不能为空', context: { errorCode: ApiErrorCode.PARAMS_DELETIONl } })
    orId: any;

    @IsNotEmpty({ message: '用户id不能为空', context: { errorCode: ApiErrorCode.PARAMS_DELETIONl } })
    userId: Array<string | number >;
}

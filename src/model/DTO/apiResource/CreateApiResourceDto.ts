import { IsString } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class CreateApiResourceDto {
    @IsString({ message: '名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    name: string;

    @IsString({ message: '描述不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    desc: string;

    @IsString({ message: '值不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    value: string;

    @IsString({ message: '类型不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    type: number;

    @IsString({ message: 'parentId不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    parentId: number;

    system: string;

    module: string;

    @IsString({ message: 'code不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    code: string;

}

import {IsEmail, IsInt, IsString, Min, Max, IsNotEmpty} from 'class-validator';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class CreateAuthorityDto {
    @IsString({ message: '权限名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    @IsNotEmpty({ message: '权限名称不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    name: string;

    @IsNotEmpty({ message: '路径不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    path: string;

    @IsNotEmpty({ message: '父级不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    parentId: any;

    desc: string;

    icon: string;

    value?: string;

    @IsNotEmpty({ message: '权限名称不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    code: string;

    id?: any;

    system?: string;

}

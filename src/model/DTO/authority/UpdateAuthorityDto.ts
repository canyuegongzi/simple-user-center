import { IsEmail, IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class UpdateAuthorityDto {
    @IsString({ message: '权限名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    @IsNotEmpty({ message: '权限名称不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    name: string;

    @IsNotEmpty({ message: '路径不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    path: string;

    desc: string;

    parentId: any;

    system?: string;

    value?: string;

    icon: string;

    @IsNotEmpty({ message: '功能id不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    id: string;

}

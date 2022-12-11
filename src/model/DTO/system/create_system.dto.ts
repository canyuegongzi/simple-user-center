import { IsNotEmpty, IsString } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class CreateSystemDto {
    @IsString({ message: '角色名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    @IsNotEmpty({ message: '系统名称不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    name: string;

    @IsString({ message: '系统值不正确', context: { errorCode: ApiErrorCode.ROLE_ALEDRY_HAVE } })
    @IsNotEmpty({ message: '系统值不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    value: string;

    @IsString({ message: '编码格式不正确', context: { errorCode: ApiErrorCode.ROLE_ALEDRY_HAVE } })
    @IsNotEmpty({ message: '编码不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    code: string;

    @IsString({ message: '属性格式不正确', context: { errorCode: ApiErrorCode.ROLE_ALEDRY_HAVE } })
    @IsNotEmpty({ message: '属性不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    attrValue: string;

    desc: any;
}

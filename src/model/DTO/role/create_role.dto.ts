import { IsEmail, IsInt, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class CreateRoleDto {
  @IsString({ message: '角色名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
  name: string;

  @IsString({ message: '该编码角色已经存在', context: { errorCode: ApiErrorCode.ROLE_ALEDRY_HAVE } })
  code: string;

  desc: any;
}

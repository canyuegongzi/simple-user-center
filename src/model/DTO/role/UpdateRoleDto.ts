import { IsEmail, IsInt, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class UpdateRoleDto {
  @IsString({ message: '角色名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
  name: string;

  desc: any;

  id: any;

  code: any;
}

import {IsEmail, IsInt, IsString, Min, Max, IsNotEmpty} from 'class-validator';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class CreateUserDto {
  @IsString({ message: '用户姓名格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
  name: string;

  @IsString( { message: '用户年龄格式不准确', context: { errorCode: ApiErrorCode.USER_AGE_NUMBER } })
  age: string;

  @IsEmail({}, { message: '邮箱格式不正确', context: { errorCode: ApiErrorCode.USER_EMAIL_EMAIL } })
  email: string;

  @IsString({ message: '地址格式不正确', context: { errorCode: ApiErrorCode.USER_ADDRESS_ADDRESS } })
  address: string;

  @IsString({ message: '密码', context: { errorCode: ApiErrorCode.USER_ADDRESS_ADDRESS } })
  password: string;

  @IsNotEmpty({ message: '角色不能为空', context: { errorCode: ApiErrorCode.USER_ADDRESS_ADDRESS } })
  roleId: string;
  desc: string;

  nick: string;

  id: any;

}

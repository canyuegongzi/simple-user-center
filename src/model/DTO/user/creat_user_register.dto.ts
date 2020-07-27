import {IsEmail, IsInt, IsString, Min, Max, IsNotEmpty} from 'class-validator';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class CreateUserRegisterDto {
  @IsString({ message: '用户姓名格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
  name: string;

  @IsEmail({}, { message: '邮箱格式不正确', context: { errorCode: ApiErrorCode.USER_EMAIL_EMAIL } })
  email: string;

  @IsString({ message: '密码', context: { errorCode: ApiErrorCode.USER_ADDRESS_ADDRESS } })
  password: string;

  nick: string;

  id: any;

  phone: string;

}

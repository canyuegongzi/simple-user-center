import { IsEmail, IsInt, IsString, Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';
import { User } from '../../entity/UserEntity';

export class CreateOrganizationDto {
  @IsString({ message: '组织名称格式不正确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
  name: string;

  desc: string;

  parentId: any;

  leaderId: any;

  users: User[];
}

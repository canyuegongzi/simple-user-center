import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class AddResourceRoleDto {
    @IsNotEmpty({ message: '角色id不能为空', context: { errorCode: ApiErrorCode.PARAMS_DELETIONl } })
    roleId: any;

    resourceIds: Array<string | number >;
}

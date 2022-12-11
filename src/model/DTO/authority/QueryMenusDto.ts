import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class QueryMenuDto {
    system: string;
    @IsNotEmpty({ message: '用户不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    user: string;

    roleId: string;
}

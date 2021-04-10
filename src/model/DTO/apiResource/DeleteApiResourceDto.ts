import {IsArray, IsNotEmpty} from 'class-validator';
import {ApiErrorCode} from '../../../config/ApiErrorCodeEnum';

export class DeleteApiResourceDto {
    isDeleteChild: number = 0; // 0 默认删除所有子节点 ：1 只删除当前节点 ，当有子节点时操作失败

    @IsArray({ message: 'id格式不准确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    ids: Array<number | string>;

    @IsNotEmpty({ message: '类型不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    type: number;

    // @IsNotEmpty({ message: '系统不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    system: string;

    // @IsNotEmpty({ message: '系统不能为空', context: { errorCode: ApiErrorCode.AUTHORITY_CREATED_FILED } })
    module: string;
}

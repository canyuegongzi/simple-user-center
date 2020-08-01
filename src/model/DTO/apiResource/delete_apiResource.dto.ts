import {IsArray} from 'class-validator';
import {ApiErrorCode} from '../../../config/api-error-code.enum';

export class DeleteApiResourceDto {
    isDeleteChild: number = 0; // 0 默认删除所有子节点 ：1 只删除当前节点 ，当有子节点时操作失败

    @IsArray({ message: 'id格式不准确', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    id: Array<number | string>;
}

import {IsNotEmpty, IsString} from 'class-validator';
import {ApiErrorCode} from '../../../config/ApiErrorCodeEnum';

export class DeleteOrganizationDto {
    isDeleteChild: number = 0; // 0 默认删除所有子节点 ：1 只删除当前节点 ，当有子节点时操作失败

    id: Array<number | string>;
}

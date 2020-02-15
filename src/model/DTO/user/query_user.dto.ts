/**
 * 查询参数
 */
export class QueryUserDto {
    name: string;

    roleId?: any;

    email?: any;

    nick?: string;

    startAge?: any;

    endAge?: any;

    orgId?: any;

    page: number;

    pageSize: number;

    isDel: number = 0;
}

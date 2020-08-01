interface ReturnData {
    [type: string]: any;
}
export enum MessageType {
    GETLIST,
    DELETE,
    GETINFO,
    CREATE,
    UPDATE,
}
export class ResultData {
    protected messageMap = {
        GETLIST: '查询成功',
        DELETE: '删除成功',
        GETINFO: '查询成功',
        CREATE: '添加成功',
        UPDATE: '更新成功',
    }
    public code: number;
    public message: string;
    public data: ReturnData;
    constructor(messageType: MessageType, data = null) {
        this.code = 200;
        this.message = this.messageMap[messageType];
        this.data = data;
    }
}

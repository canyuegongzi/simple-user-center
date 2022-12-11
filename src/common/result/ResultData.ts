interface ReturnData {
    [type: string]: any;
}
export enum MessageType {
    GETLIST,
    DELETE,
    GETINFO,
    CREATE,
    UPDATE,
    FILEERROR,
}
const messageMap = {
    0: '查询成功',
    1: '删除成功',
    2: '查询成功',
    3: '添加成功',
    4: '更新成功',
    5: 'EXCEL失败',
};
export class ResultData {
    public code: number;
    public message: string | MessageType;
    public data: any;
    public success: boolean;

    constructor(messageType: any, data = null, success = true) {
        this.code = 200;
        this.message = messageMap[messageType] || messageType;
        this.data = data;
        this.success = success;
    }
}

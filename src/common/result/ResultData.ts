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
}
export class ResultData {
    public code: number;
    public message: string;
    public data: ReturnData;
    public success: boolean;
    constructor(messageType: MessageType, data = null, success = true) {
        console.log(messageType)
        this.code = 200;
        this.message = messageMap[messageType];
        this.data = data;
        this.success = success;
    }
}

"use strict";
exports.__esModule = true;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["GETLIST"] = 0] = "GETLIST";
    MessageType[MessageType["DELETE"] = 1] = "DELETE";
    MessageType[MessageType["GETINFO"] = 2] = "GETINFO";
    MessageType[MessageType["CREATE"] = 3] = "CREATE";
    MessageType[MessageType["UPDATE"] = 4] = "UPDATE";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ResultData = /** @class */ (function () {
    function ResultData(messageType, data) {
        if (data === void 0) { data = null; }
        this.messageMap = {
            GETLIST: '查询成功',
            DELETE: '删除成功',
            GETINFO: '查询成功',
            CREATE: '添加成功',
            UPDATE: '更新成功',
        };
        this.code = 200;
        this.message = this.messageMap[messageType];
        this.data = data;
    }
    return ResultData;
}());
exports.ResultData = ResultData;
//# sourceMappingURL=ResultData.js.map
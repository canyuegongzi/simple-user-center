"use strict";
exports.__esModule = true;
exports.formatDate = function () {
    // 三目运算符
    var Dates = new Date();
    // 年份
    var Year = Dates.getFullYear();
    // 月份下标是0-11
    var Months = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    // 具体的天数
    var Day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    // 小时
    var Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
    // 分钟
    var Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
    // 秒
    var Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
    // 返回数据格式
    return Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds;
};
//# sourceMappingURL=data-time.js.map
export const formatDate = () => {
    // 三目运算符
    const Dates = new Date();

    // 年份
    const Year: number = Dates.getFullYear();

    // 月份下标是0-11
    const Months: any = ( Dates.getMonth() + 1 ) < 10  ?  '0' + (Dates.getMonth() + 1) : ( Dates.getMonth() + 1);

    // 具体的天数
    const Day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();

    // 小时
    const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();

    // 分钟
    const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();

    // 秒
    const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();

    // 返回数据格式
    return Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds;
};

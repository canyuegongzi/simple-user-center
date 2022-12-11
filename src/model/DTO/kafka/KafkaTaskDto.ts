import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class KafkaTaskDto {
    @IsNotEmpty({ message: 'operateUser不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    operateUser: string;

    @IsNotEmpty({ message: '内容不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    content: string;

    @IsNotEmpty({ message: 'title不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    title: string;

    @IsNotEmpty({ message: 'executeType不能为空 1： 单次 2：循环', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    executeType: number;

    @IsNotEmpty({ message: '任务名不能为空', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    name: string;

    @IsNotEmpty({ message: 'isDelay不能为空 0： 否 1：是', context: { errorCode: ApiErrorCode.USER_NAME_STRING } })
    isDelay?: number;

    status?: number = 0;

    id?: string;

    taskCode?: string;

    taskType = 1;

    executeCount?: number = 0;

    maxExecuteCount?: number = 1; // 最大执行次数

    startTime?: number;

    predictDealTime?: any; // 预期执行时间

    endTime?: number;

    from?: string;

    to?: string;

    emailConfigId?: number;

    // 循环执行时的时间维度
    timeType: string;

    // 循环执行的具体时间点 字符串只在延时是有用
    timeValue: string;

    taskConfig: string;

}

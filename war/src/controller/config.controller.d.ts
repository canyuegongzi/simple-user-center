import { ConfigService } from '../service/service/config.service';
import { ApiErrorCode } from '../config/api-error-code.enum';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: ConfigService);
    getList(session: any, req: any): Promise<{
        code: ApiErrorCode;
        message: string;
        data?: undefined;
    } | {
        code: number;
        data: {
            data: import("../model/entity/role.entity").Role[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: any;
    }>;
}

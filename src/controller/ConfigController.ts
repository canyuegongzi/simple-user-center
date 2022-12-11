import { Body, Controller, Get, Inject, Post, Query, Req, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/TransformInterceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/LoggingInterceptor';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '../service/ConfigService';
import { ApiErrorCode } from '../config/ApiErrorCodeEnum';
import { MessageType, ResultData } from '../common/result/ResultData';

@Controller('config')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@UseGuards(AuthGuard())
export class ConfigController {
    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    @Get('sysMenu')
    public async getList(@Session() session: any, @Req() req: any) {
        try {
            const res = await this.configService.getUserInfo(req.user);
            if (!res) {
                return { code: ApiErrorCode.TOKEN_FAIL,  message: 'token无效' };
            }
            const auth = await this.configService.getUserAuth(res.role.id);
            return new ResultData(MessageType.GETINFO, auth, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }
}

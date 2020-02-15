import {Body, Controller, Get, Inject, Post, Query, Req, Session, UseGuards, UseInterceptors} from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import {AuthGuard} from '@nestjs/passport';
import {ConfigService} from '../service/service/config.service';
import {ApiErrorCode} from '../config/api-error-code.enum';

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
                return {code: ApiErrorCode.TOKEN_FAIL,  message: 'token无效'};
            }
            const auth = await this.configService.getUserAuth(res.role.id);
            return {code: 200, data: auth, message: '查询成功'};
        }catch (e) {
            return {code: 200, data: [], message: e.errorMessage};
        }
    }
}

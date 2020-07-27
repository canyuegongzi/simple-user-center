import { WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
export declare class GatewaysExceptionFilter implements WsExceptionFilter {
    catch(exception: WsException, client: any): void;
}

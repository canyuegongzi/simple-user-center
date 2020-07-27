import { ServerNats } from '@nestjs/microservices';
export interface NatsSubscriber {
    key: string;
    value: {
        pattern: string;
        queue: string;
    };
}
export declare class NatsStrategy extends ServerNats {
    bindEvents(client: any): void;
}

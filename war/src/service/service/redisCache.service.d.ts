import { RedisService } from 'nestjs-redis';
export declare class RedisCacheService {
    private redisService;
    client: any;
    constructor(redisService: RedisService);
    getClient(): Promise<void>;
    set(key: string, value: any, seconds?: number): Promise<void>;
    get(key: string): Promise<any>;
}

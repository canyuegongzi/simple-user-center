declare const config: {
    connectMicroservice: number;
    port: number;
    tokenSetTimeOut: number;
    globalPrefix: string;
};
export declare const mysqlConfig: {
    host: string;
    userName: string;
    password: string;
};
export declare const redisConfig: {
    name: string;
    url: string;
};
export declare const redisCacheConfig: {
    host: string;
    port: number;
    ttl: number;
    max: number;
};
export declare const emailConfig: {
    authPass: string;
    fromUser: string;
    user: string;
};
export default config;

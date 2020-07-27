const config = {
    connectMicroservice: 3001, // 微服务端口
    port: 8881,
    tokenSetTimeOut: 7200,
    globalPrefix: 'simple-user-center/v1.0',
};
export const mysqlConfig = {
    host: '',
    userName: '',
    password: '',
};
export const redisConfig = {
    name: 'user_token',
    url: '127.0.0.1:6379',
};
// etc
export const redisCacheConfig = {
    host: '127.0.0.1',
    port: 6379,
    ttl: 10, // seconds
    max: 150, // seconds
};
export const emailConfig = {
    authPass: '', // qq邮箱授权码
    fromUser: '',
    user: '',
};

export const kafkaConfig = {
    url: '',
    clientId: '',
    groupId: '',
};

export default config;

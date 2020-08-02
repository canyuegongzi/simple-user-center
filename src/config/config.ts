const config = {
    connectMicroservice: 3001, // 微服务端口
    port: 8881,
    tokenSetTimeOut: 7200,
    globalPrefix: 'simple-user-center/v1.0',
};
export const mysqlConfig = {
    host: 'localhost',
    userName: 'root',
    port: 3306,
    // port: 7000,
    // password: '123Ad123Ad',
    password: '123456',
};
export const redisConfig = {
    name: 'user_token',
    url: '127.0.0.1:6379',
    // url: 'redis://127.0.0.1:6379',
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
    fromUser: '"',
    user: '1970305447@qq.com',
};

export const kafkaConfig = {
    url: '',
    clientId: 'test-app-client',
    groupId: 'test-app-group',
};

export default config;

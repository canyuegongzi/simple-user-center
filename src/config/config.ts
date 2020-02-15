const config = {
    connectMicroservice: 3001, // 微服务端口
    port: 8881,
    tokenSetTimeOut: 7200,
};
export const mysqlConfig = {
    host: '127.0.0.1',
    userName: 'root',
    password: '123456',
};
export const redisConfig = {
    name: 'user_token',
    url: 'redis://127.0.0.1:6379',
};

export const emailConfig = {
    authPass: '', // qq邮箱授权码
    fromUser: '',
    user: '',
};

export default config;

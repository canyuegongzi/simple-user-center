"use strict";
exports.__esModule = true;
var config = {
    connectMicroservice: 3001,
    port: 8881,
    tokenSetTimeOut: 7200,
    globalPrefix: 'simple-user-center/v1.0',
};
exports.mysqlConfig = {
    // host: '47.106.104.22',
    // host: '148.70.150.131',
    host: 'localhost',
    userName: 'root',
    port: 3306,
    // port: 7000,
    // password: '123Ad123Ad',
    password: '123456',
};
exports.redisConfig = {
    name: 'user_token',
    url: '127.0.0.1:6379',
};
// etc
exports.redisCacheConfig = {
    host: '127.0.0.1',
    port: 6379,
    ttl: 10,
    max: 150,
};
exports.emailConfig = {
    authPass: 'tsdrnaaktxsebfbd',
    fromUser: '"Marvin" <1970305447@qq.com>',
    user: '1970305447@qq.com',
};
exports.kafkaConfig = {
    url: '148.70.150.131:19092',
    clientId: 'test-app-client',
    groupId: 'test-app-group',
};
exports["default"] = config;
//# sourceMappingURL=config.js.map
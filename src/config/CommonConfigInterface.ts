export interface CommonConfigInterface {
    MYSQL: string; // mysql 地址
    MYSQL_PASSWORD: string;
    MYSQL_USER: string;
    MYSQL_DATABASE_NAME: string;
    MYSQL_PORT: any;
    MONGODB: string;
    MONGODB_PASSWORD: string;
    MONGODB_USER: string;
    MONGODB_DATABASE_NAME: string;
    MONGODB_PORT: any;
    MONGODB_AUTH_SOURCE: any;
    REDIS: string;
    REDIS_NAME: string;
    REDIS_HOST: string;
    REDIS_POST: string;
    KAfKA: string;
    RABBITMQ: string;
    [key: string]: string;
}
export const CommonConfigKey: CommonConfigInterface = {
    MYSQL: 'MYSQL',
    MYSQL_PASSWORD: 'MYSQL_PASSWORD',
    MYSQL_USER: 'MYSQL_USER',
    MYSQL_DATABASE_NAME: 'MYSQL_DATABASE_NAME',
    MYSQL_PORT: 'MYSQL_PORT',
    MONGODB: 'MONGODB',
    MONGODB_PASSWORD: 'MONGODB_PASSWORD',
    MONGODB_USER: 'MONGODB_USER',
    MONGODB_DATABASE_NAME: 'MONGODB_DATABASE_NAME',
    MONGODB_PORT: 'MONGODB_PORT',
    MONGODB_AUTH_SOURCE: 'MONGODB_AUTH_SOURCE',
    REDIS: 'REDIS',
    REDIS_NAME: 'REDIS_NAME',
    REDIS_HOST: 'REDIS_HOST',
    REDIS_POST: 'REDIS_POST',
    KAfKA: 'KAfKA',
    RABBITMQ: 'RABBITMQ',
};

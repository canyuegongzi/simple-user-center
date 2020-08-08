import { networkInterfaces } from 'os';

/**
 * 将枚举值转换成数组
 * @param Enum 枚举
 */
export function enumToArray<E>(Enum: any): E[] {
  return Object.keys(Enum)
    .filter(key => typeof Enum[key as any] === 'number')
    .map(key => Enum[key]);
}

/**
 * 生成随机字符串
 * @param {number} length 生成长度
 * @param {string} charSet 指定字符集
 * @returns {string} 生成字符串
 */
export const randomString = (length: number = 8, charSet?: string): string => {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // tslint:disable-next-line:no-shadowed-variable
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

/**
 * 获取服务部署 IP 地址
 */
export function getIPAdress(): string {
  const interfaces = networkInterfaces();

  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

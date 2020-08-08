import * as crypto from 'crypto';
/*
 * cookie加密方法
 * key： 密钥
 * iv： iv
 * str: 加密的字符串
 * */
export const encrypt = async (key: string, iv: string, str: string) => {
  const decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return decipher.update(str, 'binary', 'base64') + decipher.final('base64');
};
/*
 * cookie 解密方法
 * key： 密钥
 * iv： iv
 * str: 加密的字符串
 * */
export const decrypt = async (key: string, iv: string, str: string) => {
  const crypted = new Buffer(str, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
};

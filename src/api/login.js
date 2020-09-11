/*
* 包含N个接口请求函数的模块
*/

import ajax from "./ajax";
import {url} from "./ajax";


//生成随机值uuid(方便后期拓展权限)
export function getUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

//1：登录
export const doLogin = (params) => ajax(`/login`, params, 'POST');

//2：请求验证码
export function getCaptchaPath(uuid) {
  return url+ "/captcha?uuid=" + uuid;
}
//退出登录
export const doLogout = () => ajax(`/logout`);




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
//3.退出登录
export const doLogout = () => ajax(`/logout`);
//4.修改密码
export const updatePwd = (params) => ajax(`/user/updatePwd`,params,'POST')
//5.请求验证码
export const requireMsgCode = (params) => ajax(`/msg/requireCode`,params,'POST')
//6.短信验证码登录
export const msgLogin = (params) => ajax(`/msg/login`,params,'POST');
//7.获取第三方登录的结果也就是accessToken，采用定时器获取获取
export const requireAccessToken = () =>ajax(`/third/require`)







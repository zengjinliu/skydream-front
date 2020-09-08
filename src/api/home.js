/*
* 包含N个接口请求函数的模块
*/

import ajax from './ajax'
import {url} from "./ajax";


//侧边菜单栏请求
export const getNavMenuList = () => ajax(url +"/getNavList");
//退出登录
export const logout = () => ajax(url + "/logout");
//跟新新密码
export const updatePwd = (pwd,npwd) =>ajax(url +"/updatePwd",{pwd,npwd},'POST');

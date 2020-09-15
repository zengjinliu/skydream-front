import ajax from "./ajax";


//1.分页查询用户
export const getUserPage = (param) => ajax(`/user/page`,param,'POST');
//删除用户
export const delUser = (param) => ajax(`/user/del`,param,'POST')

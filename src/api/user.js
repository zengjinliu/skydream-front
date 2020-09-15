import ajax from "./ajax";


//1.分页查询用户
export const getUserPage = (param) => ajax(`/user/page`, param, 'POST');
//2.删除用户
export const delUser = (param) => ajax(`/user/del`, param, 'POST');
//3.检查用户名是否已存在
export const checkNameExist = (username) => ajax(`/user/checkNameExist`, {username});
//4.新增用户
export const add = (param) => ajax(`/user/add`, param, 'POST');
//5.修改用户
export const update = (param) => ajax(`/user/update`, param, 'POST');
//6.根据主键id查询用户
export const queryUserById = (userId) => ajax(`/user/queryById`,{userId});

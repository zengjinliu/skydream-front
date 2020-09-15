import ajax from "./ajax";

//1.分页查询
export const getRolePage = (param) => ajax(`/role/page`, param, 'POST');
//2.新增角色
export const addRole = (param) => ajax(`/role/add`, param, 'POST');

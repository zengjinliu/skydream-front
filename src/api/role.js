import ajax from "./ajax";

//1.分页查询
export const getRolePage = (param) => ajax(`/role/page`, param, 'POST');
//2.新增角色
export const addRole = (param) => ajax(`/role/add`, param, 'POST');
//3.删除角色
export const delRole = (param) => ajax(`/role/del`, param, 'POST')
//4.根据角色主键查询
export const queryById = (roleId) => ajax(`/role/queryById`,{roleId});
//修改角色
export const update = (param) => ajax(`/role/update`,param,'POST');
//获取所有的角色
export const getAllRoles = () => ajax(`/role/getAllRoles`);

import ajax from "./ajax";

//1.请求所有的菜单
export const getAllMenus = () => ajax(`/menu/getNavList`)
//2.请求符合ui的树形结构菜单
export const getTreeMenu = () => ajax(`/menu/getTreeMenu`)
//3.删除菜单
export const deleteMenu = (menuId) => ajax(`/menu/del`, {menuId});
//4.添加菜单
export const addMenu = (param) => ajax(`/menu/add`, param, 'POST')
//5.通过菜单id查询
export const queryById = (menuId) => ajax(`/menu/queryById`, {menuId});
//6.通过主键修改菜单
export const update = (param) => ajax(`/menu/update`, param, 'POST');

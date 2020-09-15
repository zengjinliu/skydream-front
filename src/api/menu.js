import ajax from "./ajax";

//请求所有的菜单
export const getAllMenus= () => ajax(`/menu/getNavList`)
//请求符合ui的树形结构菜单
export const getTreeMenu = () =>ajax(`/menu/getTreeMenu`)

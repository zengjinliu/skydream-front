import ajax from "./ajax";

//请求所有的菜单
export const getAllMenus= () => ajax(`/getNavList`)

/*
* 包含N个接口请求函数的模块
*/

import ajax from './ajax'
import {url} from "./ajax";


//侧边菜单栏请求
export const getNavMenuList = () => ajax(url +"/getNavList");

let config =[
  {
    "createUserId":0,
    "parentMenuId":0,
    "icon":"el-icon-message",
    "name":"系统管理",
    "alias":"系统管理",
    "id":1,
    "sort":0,
    "state":"ENABLE",
    "type":"NONE",
    "value":"",
    "childs":[
      {
        "createUserId":0,
        "parentMenuId":1,
        "icon":"el-icon-message",
        "name":"权限管理",
        "alias":"权限管理",
        "id":3,
        "sort":0,
        "state":"ENABLE",
        "type":"LINK",
        "value":"/auth",
        "childs":[
          {
            "createUserId":0,
            "parentMenuId":3,
            "icon":"el-icon-message",
            "name":"权限管理son",
            "alias":"权限管理son",
            "id":11,
            "sort":0,
            "state":"ENABLE",
            "type":"LINK",
            "value":"/auth",
            "childs":[

            ]
          }
        ]
      },
      {
        "createUserId":0,
        "parentMenuId":1,
        "icon":"el-icon-message",
        "name":"角色管理",
        "alias":"角色管理",
        "id":3,
        "sort":1,
        "state":"ENABLE",
        "type":"LINK",
        "value":"/elc",
        "childs":[
          {
            "createUserId":0,
            "parentMenuId":3,
            "icon":"el-icon-message",
            "name":"权限管理son",
            "alias":"权限管理son",
            "id":11,
            "sort":0,
            "state":"ENABLE",
            "type":"LINK",
            "value":"/auth",
            "childs":[

            ]
          }
        ]
      }
    ]
  },
  {
    "createUserId":0,
    "parentMenuId":0,
    "icon":"el-icon-news",
    "name":"用户管理",
    "alias":"用户管理",
    "id":6,
    "sort":1,
    "state":"ENABLE",
    "type":"NONE",
    "childs":[
      {
        "createUserId":0,
        "parentMenuId":6,
        "icon":"el-icon-message",
        "name":"邮箱管理",
        "alias":"邮箱管理",
        "id":7,
        "sort":0,
        "state":"ENABLE",
        "type":"LINK",
        "value":"/elc",
        "childs":[

        ]
      }
    ]
  }
]

export default config

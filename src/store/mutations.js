/*
直接更新state的多个方法的对象
只有mutation能改变state,必须是同步的，才能追踪到状态变化，不然就违背设计的初衷
*/
export default {
  USER_INFO(state,info){
    state.user = info
  }
}

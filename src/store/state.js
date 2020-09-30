/*
 * store简单用法
 *1. 首先在state中定义全局共享变量
      user:'';
  2. 在action中定义出发改变共享变量中的值的方法
      saveUserInfo({commit},data){
        commit('USER_INFO',data)
      }
  3. 在mumations中定义接受 提交并且改变state的变化
      USER_INFO(state,info){
        state.user = info //将statu中的队形进行一个更新操作
      }

    使用步骤:
    this.$store.dispatch('saveUserInfo',userObject);
 */

/*状态对象*/
export default {
  user:""
}

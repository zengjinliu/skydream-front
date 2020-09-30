/*
通过mutation间接更新state的多个方法的对象
action提交的mutation，而不是 直接改变state的状态，并且是一部提交的
*/
export default {
  saveUserInfo({commit},data){
    commit('USER_INFO',data)
  }
}

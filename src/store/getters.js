/*
包含基于state的getter计算属性,对于state中的数据不是我们想要的可以在getters进行处理后得到
1.getter接受state作为其第一个参数
2.还可以接收getters最为第二各参数
3.可以把树形变成一个函数，支持传参的写法
    (state) => (fm)=>{}
*/
export default {
    username : state=>{
        return state.user.username
    }
}

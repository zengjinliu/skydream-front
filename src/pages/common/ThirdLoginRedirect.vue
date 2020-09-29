<template>
  <div>跳转中心</div>
</template>

<script>
  import {getAllPerms} from "@/api/user";
  import router from "@/router";

  export default {
    name: 'ThirdLoginRedirect',
    data () {
      return {
        res: this.$route.query.result
      }
    },
    mounted () {
      // 这是element-ui中的组件
      const loading = this.$loading({
        lock: true,
        text: '登陆中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.saveInfo()
      loading.close()
    },
    methods: {
      saveInfo () {
        let info = JSON.parse(this.res)
        // 跳转到登录前的页面或主页
        this.$cookie.set('token', info.token);
        let user = {username: info.username, id: info.userId};
        this.$store.dispatch('saveUserInfo', user)
        this.$router.replace('/info');
        //登陆成功后将权限信息保存
        this.queryAllPerms();
      },
      queryAllPerms() {
        getAllPerms().then(res => {
          if (res.code === 200) {
            //将权限信息进行缓存
            sessionStorage.setItem('permissions', res.datas);
          }
        }).catch(err => {
          router.push('/login')
        })
      },
    }
  }
</script>

<style scoped>

</style>

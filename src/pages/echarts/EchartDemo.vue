<!-- Echarts-Demo -->
<template>
  <div ref="demo" class="echarts-demo"></div>
</template>

<script>
export default {
  data () {
    return {
        msg: 'Welcome to your first vue app!'
    }
  },
  //组件
  components: {

  },
  //方法集合
  methods: {
      drawLine(){
        //准备好dom，实例化echarts
        let echart = this.$echarts.init(this.$refs.demo);
        //绘制图表
        echart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
      }
  },
  created(){

  },
  mounted(){
      this.drawLine();
  },
}
</script>
<style  scoped>

.echarts-demo {
    width:300px;
    height: 300px;
}

</style>
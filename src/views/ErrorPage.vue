<template>
  <div class="error-box">
    <van-empty image="error" :description="msg" />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  setup(){
    const { ctx: { $router: { currentRoute } } } = getCurrentInstance()
    const msg = currentRoute.value.params.msg || '未知错误'

    return {
      msg
    }
  }
}
</script>

<style lang="less" scoped>
  .error-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
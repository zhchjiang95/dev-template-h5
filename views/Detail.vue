<template>
  <div>
    <nav-bar title="detail" leftTitle="返回" rightTitle="提交" @click-right="onSubmitHandler" />
    <div class="content">hello detail!</div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  name: "detail",
  data() {
    return {};
  },
  components: {
    NavBar
  },
  created() {
  },
  methods: {
    onSubmitHandler(){
      this.$toast('ok')
    }
  }
};
</script>

<style lang="less" scoped>
</style>

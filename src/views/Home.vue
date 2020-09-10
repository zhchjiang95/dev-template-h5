<template>
<div>
  <slot-nav-bar title="home" leftTitle=''>
    <span class="slot-span" v-for="(item, index) in ['按钮1', '按钮2']" :key="index" @click="onClickRight(item)">{{item}}</span>
  </slot-nav-bar>

  <van-button class="abc" data-jt-id="b666" type="primary" to="detail?id=1">{{btnTxt}}</van-button>
</div>
</template>

<script>
import { getUserInfo } from '../utils/request'
import SlotNavBar from '../components/SlotNavBar'
export default {
  name: "home",
  data() {
    return {
      btnTxt: 'to detail'
    };
  },
  components: {
    SlotNavBar
  },
  created() {
    console.log(getUserInfo)
  },
  methods: {
    onClickRight(str) {
      this.$toast(str)
    }
  }
};
</script>

<style lang="less" scoped>

</style>

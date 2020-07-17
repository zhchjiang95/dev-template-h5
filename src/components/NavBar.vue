<template>
  <!-- 导航栏 默认方式 -->
  <div class="nav-bar">
    <van-nav-bar :title="title" left-arrow fixed z-index="9999" :placeholder="true" :border="false" :left-text="leftTitle" :right-text="rightTitle" @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar>
  </div>
</template>


<script>
export default {
  name: 'navBar',
  props: ['title', 'leftTitle', 'rightTitle'],
  methods:{
    onClickRight(){
      this.$emit('click-right')
    },
    onClickLeft(){
      this.$router.go(-1)
    }
  }
};
</script>

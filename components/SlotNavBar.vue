<template>
  <!-- 导航栏 自定义右侧按钮 -->
  <div class="solt-nav-bar">
    <van-nav-bar
      :title="title"
      left-arrow
      fixed
      z-index="9999"
      :placeholder="true"
      :border="false"
      :left-text="leftTitle"
      @click-left="onClickLeft"
    >
      <template #right>
        <slot></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: ["title", "leftTitle", "rightTitles"],
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    }
  }
};
</script>

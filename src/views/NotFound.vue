<template>
  <div>
    你查找的页面不存在，请检查你的网址
    <div>
      <router-link to="/NotebookList">返回主页</router-link>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  
  @Component
  export default class NotFound extends Vue {
  
  }
</script>

<style lang="scss" scoped>

</style>
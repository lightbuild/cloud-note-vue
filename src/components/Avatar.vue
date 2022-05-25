<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  
  @Component
  export default class Avatar extends Vue {
    user = {
      username:'hunger'
    }
    slug = 'H'
  }
</script>

<style lang="scss" scoped>
  span {
    display: inline-block;
    width: 1.8em;
    height: 1.8em;
    text-align: center;
    line-height: 1.8em;
    border-radius: 50%;
    background: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-size:18px;
    margin-top: 15px;
  }
</style>
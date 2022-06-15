<template>
  <span :title="user.username">未</span>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import auth from '@/lib/apis/auth';
  import Bus from '@/lib/helper/Bus';
  
  @Component
  export default class Avatar extends Vue {
    user = {
      username:'未登录'
    }
    // get slug(){
    //   return this.user.username.charAt(0)
    // }
    // created(){
    //   auth.getInfo().then(res => {
    //     if(res.isLogin){
    //       this.user.username = res.data!.username;
    //     }
    //   })
    // }
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
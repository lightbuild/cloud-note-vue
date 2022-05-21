<template>
  <div class="sidebar">
    <div class="user-name">
      用户名
    </div>
    <div class="nav">
      <router-link to="/note/1">
        <Icon name="notebook"/>
      </router-link>
      <router-link to="/notebooks">
        <Icon name="notebookList"/>
      </router-link>
      <router-link to="/trash/1">
        <Icon name="trash"/>
      </router-link>
      <div class="helper"></div>
      <Icon class="login-out" name="loginOut"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  @Component({
    components: {Icon}
  })
  export default class Sidebar extends Vue {
  }
</script>

<style lang="scss" scoped>
  .sidebar{
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 56px;
    background:#2c333c;
    .user-name{
      width: 30px;
      height: 60px;
      background: white;
    }
    .nav{
      margin-top: 5px;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .helper{
        flex: 1;
      }
      .icon{
        color: #fff;
        margin-top: 8px;
        width: 1.4em;
        height: 1.4em;
      }
      .login-out{
        margin-bottom: 10px;
      }
    }
  }
</style>
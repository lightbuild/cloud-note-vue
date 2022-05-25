<template>
  <div class="sidebar">
    <div class="user-name">
      用户名
    </div>
    <div class="nav">
      <router-link to="/note/1" title="笔记页">
        <Icon name="notebook"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <Icon name="notebookList"/>
      </router-link>
      <router-link to="/trash/1" title="回收站">
        <Icon name="trash"/>
      </router-link>
      <div class="helper"></div>
      <Icon class="login-out" name="loginOut" @click="onLogout"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import auth from '@/lib/apis/auth'
  
  @Component({
    components: {Icon}
  })
  export default class Sidebar extends Vue {
    onLogout() {
      auth.logout().then(data=>{
        console.log(data);
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 56px;
    background: #2c333c;
    
    .user-name {
      text-align: center;
      width: 30px;
      height: 60px;
      background: white;
    }
    
    .nav {
      height: 100%;
      display: flex;
      flex-direction: column;
      
      .router-link-active{
        .icon{
          color:$color-highlight
        }
      }
      
      .helper {
        flex: 1;
      }
      
      .icon {
        color: #fff;
        margin-top: 15px;
        width: 1.4em;
        height: 1.4em;
        cursor: pointer;
      }
      
      .login-out {
        margin-bottom: 20px;
      }
    }
  }
</style>
<template>
  <div class="sidebar">
    <avatar/>
    <div class="nav">
      <router-link to="/note" title="笔记页" class=noteDetail>
        <my-icon name="notebook"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <my-icon name="notebookList"/>
      </router-link>
      <router-link to="/trash" title="回收站">
        <Icon name="trash"/>
      </router-link>
      <div class="helper"></div>
      <my-icon class="login-out" name="loginOut" @click="onLogout"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';
  import myIcon from '@/components/MyIcon.vue';
  import auth from '@/lib/apis/auth'
  import Avatar from '@/components/Avatar.vue';
  import MyIcon from '@/components/MyIcon.vue';
  
  @Component({
    components: {MyIcon, Avatar, Icon: myIcon}
  })
  export default class Sidebar extends Vue {
    onLogout() {
      auth.logout().then(data=>{
        this.$router.push({path:'login'})
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
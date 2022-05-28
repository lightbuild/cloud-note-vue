<template>
  <layout class-prefix="login">
    <div class="overlay">
      <div class="login-wrapper">
        <div class="main"></div>
        <div class="form">
          <h3 @click="showRegister">创建账户</h3>
          <transition name="slide">
            <div :class="{show: user.isShowRegister}" class="register">
              <input type="text" v-model="user.register.username" placeholder="用户名">
              <input type="text" v-model="user.register.password" placeholder="密码">
              <div class="button" @click="onRegister">创建账号</div>
              <p :class="{error:user.register.isError}">{{ user.register.notice }}</p>
            </div>
          </transition>
          <h3 @click="showLogin">登录</h3>
          <transition name="slide">
            <div :class="{show:user.isShowLogin}" class="login">
              <input type="text" v-model="user.login.username" placeholder="输入用户名">
              <input type="text" v-model="user.login.password" placeholder="密码">
              <div class="button" @click="onLogin">登录</div>
              <p :class="{error:user.login.isError}">{{ user.login.notice }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import Bus from '@/lib/helper/Bus';
  
  @Component({
    components: {Layout, Icon}
  })
  export default class Login extends Vue {
    user: UserData = {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '创建账号后，请记住用户名和密码',
        isError: false
      }
    };
    
    showRegister(){
      this.user.isShowLogin = false;
      this.user.isShowRegister = true;
    }
    
    showLogin(){
      this.user.isShowLogin = true;
      this.user.isShowRegister = false;
    }
    
    onRegister(){
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.user.register.username)) {
        this.user.register.isError = true;
        this.user.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文';
        return;
      }
      if (!/^.{6,16}$/.test(this.user.register.password)) {
        this.user.register.isError = true;
        this.user.register.notice = '密码长度为6~16个字符';
        return;
      }
      auth.register({
        username: this.user.register.username,
        password: this.user.register.password
      }).then(data => {
        this.user.register.isError = false;
        this.user.register.notice = '';
        Bus.$emit('userInfo', {username: this.user.login.username});
        this.$router.push({path: 'notebooks'});
      }).catch(data => {
        this.user.register.isError = true;
        this.user.register.notice = data.msg;
      });
    }
    
    onLogin(){
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.user.login.username)) {
        this.user.login.isError = true;
        this.user.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文';
        return;
      }
      if (!/^.{6,16}$/.test(this.user.login.password)) {
        this.user.login.isError = true;
        this.user.login.notice = '密码长度为6~16个字符';
        return;
      }
      auth.login({
        username: this.user.login.username,
        password: this.user.login.password
      }).then(data => {
        this.user.login.isError = false;
        this.user.login.notice = '';
        Bus.$emit('userInfo', {username: this.user.login.username});
        this.$router.push({path: 'notebooks'});
      }).catch(data => {
        this.user.login.isError = true;
        this.user.login.notice = data.msg;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .login-wrapper {
      width: 800px;
      height: 500px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: $font-hei;
      display: flex;
      
      .main {
        flex: 1;
        background: #4fc08d url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
        background-size: contain;
      }
      
      .form {
        width: 270px;
        border-left: 1px solid #ccc;
        
        h3 {
          padding: 10px 20px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
          
          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }
        
        .button {
          background-color: #2bb964;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius: 4px;
          margin-top: 18px;
          cursor: pointer;
        }
        
        .register, .login {
          padding: 0px 20px;
          border-top: 1px solid #eee;
          height: 0;
          overflow: hidden;
          transition: height .4s;
          
          &.show {
            height: 193px;
          }
          
          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;
          }
          
          input:focus {
            border: 3px solid #9dcaf8;
          }
          
          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }
          
          .error {
            color: red;
          }
          
          .login {
            border-top: 0;
          }
        }
        
        
      }
    }
    
  }


</style>

<template>
    <layout>
      <div class="overlay"></div>
      <div class="login-wrapper">
        git remote add origin git@github.com:lightbuild/cloud-note-vue.git
      </div>
    </layout>
    
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import Layout from '@/components/Layout.vue';
  
  @Component({
    components: {Layout, Icon}
  })
  export default class Login extends Vue {
    data(){
      return {
        msg:'This is login page'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .overlay{
    position: fixed;
    z-index:100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    transition: opacity .3s ease;
  }
</style>
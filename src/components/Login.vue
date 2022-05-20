<template>
  <div id="login">
    <h1>{{msg}}</h1>
    <Icon name="label"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import x from '@/assets/icons/label.svg'
  import Icon from '@/components/Icon.vue';

  console.log(x);
  @Component({
    components: {Icon}
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
  #login{
    h1 {
      color:red
    }
  }
</style>
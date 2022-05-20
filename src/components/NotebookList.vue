<template>
  <div>
    <h1>{{msg}}</h1>
    <ul>
      <Li><router-link to="/note/1">笔记本1</router-link></Li>
      <Li><router-link to="/note/2">笔记本2</router-link></Li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  
  @Component
  export default class NotebookList extends Vue {
    name = 'Login'
    data(){
      return{
        msg:'This is NotebookList page'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
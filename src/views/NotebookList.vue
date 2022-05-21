<template>
  <layout>
      <button value="新建笔记本"></button>
      <ul>
        <li>吃饭</li>
        <li>衣服</li>
      </ul>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  
  @Component({
    components: {Layout}
  })
  export default class NotebookList extends Vue {
    name = 'Login';
    
    data() {
      return {
        msg: 'This is NotebookList page'
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="layout-wrapper">
    <sidebar></sidebar>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Sidebar from '@/components/Sidebar.vue';
  @Component({
    components: {Sidebar}
  })
  export default class Layout extends Vue {
  
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    display: flex;
    flex-direction: row;
    border:3px solid green;
    min-height: 100%;
    .content{
      flex: 1;
    }
  }
  
</style>
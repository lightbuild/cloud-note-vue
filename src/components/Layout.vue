<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <sidebar></sidebar>
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Sidebar from '@/components/Sidebar.vue';
  @Component({
    components: {Sidebar}
  })
  export default class Layout extends Vue {
  @Prop(String) classPrefix:string|undefined
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    display: flex;
    flex-direction: row;
    min-height: 100%;
    .content{
      flex: 1;
    }
  }
</style>
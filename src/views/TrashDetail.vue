<template>
  <layout>
    {{msg}}
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  @Component({
    components: {Layout}
  })
  export default class TrashDetail extends Vue {
    name = 'Login'
    data(){
      return {
        msg:"This is TrashDetail page"
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
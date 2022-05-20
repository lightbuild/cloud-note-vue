<template>
  <div>
    <h1>
      {{msg}} : {{$route.params.noteId}}
    </h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  
  @Component
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
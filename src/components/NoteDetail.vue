<template>
  <div>
    <h1>{{msg}}:{{$route.params.noteId}}</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  
  @Component
  export default class NoteDetail extends Vue {
    name = "Login"
    data(){
      return {
        msg:"This is NodeDetail page"
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
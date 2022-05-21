<template>
  <Layout>
    {{msg}}
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  @Component({
    components: {Layout}
  })
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
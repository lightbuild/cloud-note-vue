<template>
  <Layout class-prefix="notebookDetail">
    {{msg}}
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  @Component({
    components: {Layout}
  })
  export default class NoteDetail extends Vue {
    created(){
      auth.getInfo().then(res=>{
        if (!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <Layout class-prefix="notebookDetail">
    <h1>notebookId:{{$route.query.notebookId}}</h1>
    <h1>noteId:{{$route.query.noteId}}</h1>
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
    created() {
      auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  ::v-deep .sidebar {
    .nav {
      .noteDetail {
        .icon {
          color: $color-highlight
        }
      }
    }
  }
</style>
<template>
  <Layout class-prefix="notebookDetail">
    <NoteSidebar id="note"></NoteSidebar>
    <h1>notebookId:{{$route.query.notebookId}}</h1>
    <h1>noteId:{{$route.query.noteId}}</h1>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import NoteSidebar from '@/components/NoteSidebar.vue';
  
  @Component({
    components: {NoteSidebar, Layout}
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
  ::v-deep .content{
    display: flex;
  }
  #note{
  
  }
</style>
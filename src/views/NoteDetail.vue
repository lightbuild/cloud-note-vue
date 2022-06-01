<template>
  <Layout class-prefix="notebookDetail">
    <NoteSidebar></NoteSidebar>
    <NoteContent></NoteContent>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import NoteSidebar from '@/components/NoteDetail/NoteSidebar.vue';
  import NoteContent from '@/components/NoteDetail/NoteContent.vue';
  
  @Component({
    components: {NoteContent, NoteSidebar, Layout}
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
</style>
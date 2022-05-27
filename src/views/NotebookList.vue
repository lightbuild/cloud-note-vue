<template>
  <layout class-prefix="notebookList">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <Icon name="add"/>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="main-wrapper">
        <h3>笔记本列表</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <div>
              <span class="icon-notebook"><Icon name="notebook"/></span>笔记本标题1 <span>3</span><span
              class="action">编辑</span>
              <span class="action">删除</span>
              <span class="data">3天前</span>
            </div>
          </a>
          <a href="#" class="notebook">
            <div>
              <span class="icon-notebook"><Icon name="notebook"/></span>笔记本标题2 <span>1</span><span
              class="action">编辑</span>
              <span class="action">删除</span>
              <span class="data">5天前</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import Icon from '@/components/Icon.vue';
  
  @Component({
    components: {Icon, Layout}
  })
  export default class NotebookList extends Vue {
    onCreate() {
      console.log('增加笔记本');
    }
    
    created() {
      auth.getInfo().then((res:any) => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/notebook-list.scss";
</style>
<template>
  <layout class-prefix="notebookList">
    <h3>新建笔记本</h3>
<!--    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <my-icon name="add"/>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="main-wrapper">
        <h3>笔记本列表 {{ notebooksList.length }}</h3>
        <div class="book-list">
          <router-link v-for="notebook of notebooksList" :key="notebook.id"
                       :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="icon-notebook"><Icon name="notebook"/></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="data">{{ notebook.beatifyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>-->
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import myIcon from '@/components/MyIcon.vue';
  import Notebooks from '@/lib/apis/notebookList';
  import beautifyDate from '@/lib/helper/beautifyDate';
  import {MessageBoxInputData} from 'element-ui/types/message-box';
  import MyIcon from '@/components/MyIcon.vue';
  
  @Component({
    components: {MyIcon, Icon: myIcon, Layout}
  })
  export default class NotebookList extends Vue {
   /* notebooksList: NotebooksListBaseData[] = [];
    
    created() {
      auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
      Notebooks.getAll()
        .then(res => {
          this.notebooksList = res.data || [];
          console.log(res);
        });
    }
    
    onCreate() {
      this.$prompt('输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(res => {
        const value = (res as MessageBoxInputData).value;
        return Notebooks.addNotebook({title: value});
      }).then(res => {
        res.data!.beatifyCreatedAt = beautifyDate(res.data!.createdAt);
        this.notebooksList.push(res.data!);
        this.$message.success(res.msg);
      });
    }
    
    onEdit(notebook: NotebooksListBaseData) {
      let newTitle = '';
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        inputValue: notebook.title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(res => {
        newTitle = (res as MessageBoxInputData).value;
        return Notebooks.updateNotebooks(notebook.id, {title: newTitle});
      }).then(res => {
        notebook.title = newTitle;
        this.$message.success(res.msg);
      });
    }
    
    onDelete(notebook: NotebooksListBaseData) {
      this.$confirm('确认要删除笔记本吗', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id);
      }).then((res => {
        this.notebooksList.splice(this.notebooksList.indexOf(notebook), 1);
        this.$message.success('删除成功');
      }));
    }*/
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/notebook-list.scss";
</style>
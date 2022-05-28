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
        <h3>笔记本列表  {{ notebooksList.length}}</h3>
        <div class="book-list">
          <router-link v-for="notebook of notebooksList" :key="notebook.id"
                       :to="{name:'note',params:{noteId:`${notebook.id}`}}" class="notebook">
            <div>
              <span class="icon-notebook"><Icon name="notebook"/></span>{{ notebook.title }}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit()">编辑</span>
              <span class="action" @click.stop.prevent="onDelete()">删除</span>
              <span class="data">{{ notebook.beatifyCreatedAt}}</span>
            </div>
          </router-link>
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
  import Notebooks from '@/lib/apis/notebookList';
  import beautifyDate from '@/lib/helper/beautifyDate';
  
  @Component({
    components: {Icon, Layout}
  })
  export default class NotebookList extends Vue {
    notebooksList: NotebooksListBaseData[] = [];
    
    created() {
      auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
      Notebooks.getAll()
        .then(res => {
          this.notebooksList = res.data!;
          console.log(res);
        });
    }
    
    onCreate() {
      let title = window.prompt('请输入笔记本名');
      if(title !== null){
        if (title.trim() ==='') {
          alert('笔记本名不能为空');
          return;
        }else{
          Notebooks.addNotebook(title)
            .then(res => {
              console.log(beautifyDate(res.data!.createdAt));
              res.data!.beatifyCreatedAt = beautifyDate(res.data!.createdAt);
              this.notebooksList.push(res.data!);
              alert(res.msg);
            }).catch(res=>{
              alert(res.msg)
          });
        }
      }
    }
    
    onEdit() {
      console.log('编辑');
      // let title = window.prompt('修改标题', notebook.title);
      // Notebooks.updateNotebooks(notebook.id, {title})
      //   .then(res => {
      //     notebook.title = title;
      //     alert(res.msg);
      //   });
    }
    
    onDelete() {
      console.log('删除');
      // let isConfirm = window.prompt('你确定要删除吗');
      // if (isConfirm) {
      //   Notebooks.deleteNotebook(this.notebooksList.id)
      //   .then((res=>{
      //     this.notebooksList.splice(this.notebooksList.indexOf(notebook),1)
      //     alert(res.msg)
      //   }))
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/notebook-list.scss";
</style>
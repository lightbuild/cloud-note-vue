<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="onCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <my-icon name="down"></my-icon>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook of notebooks" :key="notebook.id" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note of notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="data">{{ note.beatifyUpdateAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import MyIcon from '@/components/MyIcon.vue';
  import notebookList from '@/lib/apis/notebookList';
  import note from '@/lib/apis/note';
  
  
  @Component({
    components: {MyIcon}
  })
  export default class NoteSideBar extends Vue {
    notebooks: NotebooksListBaseData[] = [];
    notes: NoteBaseData[] = [];
    curBook = {} as NotebooksListBaseData;
    
    created() {
      notebookList.getAll()
        .then(res => {
          this.notebooks = res.data!;
          this.curBook = this.notebooks.find(notebook => notebook.id.toString() === this.$route.query.notebookId) || this.notebooks[0] || {};
          return note.getAll({notebookId: this.curBook.id.toString()});
        }).then(res => {
        this.notes = res.data!;
      });
      
    }
    
    onCommand(notebookId:any) {
      if(notebookId === 'trash'){
         return this.$router.push({path:'/trash'})
      }
      console.log(notebookId);
      note.getAll({notebookId})
            .then(res=>{
              this.notes = res.data!
            })
    }
    
    addNote() {
      console.log('新增笔记本');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/note-sidebar.scss";
</style>
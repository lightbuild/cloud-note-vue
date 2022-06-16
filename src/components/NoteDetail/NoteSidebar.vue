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
  import NotebooksModule from '@/store/modules/notebooks';
  import NoteModule from '@/store/modules/note';
  
  @Component({
    components: {MyIcon}
  })
  export default class NoteSideBar extends Vue {
    get curBook() {
      return NotebooksModule.curBook;
    }
    
    get notebooks() {
      return NotebooksModule.notebooks;
    }
    
    get notes() {
      return NoteModule.noteList;
    }
    
    created() {
      NotebooksModule.getNotebooks()
        .then(res => {
          NotebooksModule.setCurbookM(this.$route.query);
        }).then(res=>{
          NoteModule.setNote(this.curBook.id);
      })
      
    }
    
    onCommand(notebookId: any) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'});
      }
      this.curBook = this.notebooks.find(notebook => notebook.id === notebookId)!;
      note.getAll({notebookId})
        .then(res => {
          this.notes = res.data!;
        });
    }
    
    addNote() {
      const id = this.curBook.id.toString();
      note.addNotebook({notebookId: id})
        .then(res => {
          this.notes.unshift(res.data!);
        });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/note-sidebar.scss";
</style>
<template>
  <Layout>
    <div id="trash" class="detail">
      <div class="note-sidebar">
        <h3 class="notebook-title">回收站</h3>
        <div class="menu">
          <div>更新时间</div>
          <div>标题</div>
        </div>
        <ul class="notes">
          <li v-for="note in trashNotes" :key="note.id">
            <router-link :to="`/trash?noteId=${note.id}`">
              <span class="date">{{ note.beatifyUpdateAt }}</span>
              <span class="title">{{ note.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="note-detail">
        <div class="note-bar" v-if="true">
          <span> 创建日期: {{ curTrashNote.beatifyCreatedAt }}</span>
          <span> | </span>
          <span> 更新日期: {{ curTrashNote.beatifyUpdateAt }}</span>
          <span> | </span>
          <span> 所属笔记本: {{ belongTo }}</span>
          <a class="btn action" @click="onRevert">恢复</a>
          <a class="btn action" @click="onDelete">彻底删除</a>
        </div>
        <div class="note-title">
          <span>{{ curTrashNote.title }}</span>
        </div>
        <div class="editor">
          <div class="preview markdown-body" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Layout from '@/components/Layout.vue';
  import auth from '@/lib/apis/auth';
  import MarkdownIt from 'markdown-it';
  import TrashNoteModule from '@/store/modules/trash';
  import NotebooksModule from '@/store/modules/notebooks';
  import NoteModule from '@/store/modules/note';
  
  let md = new MarkdownIt();
  @Component({
    components: {Layout}
  })
  export default class TrashDetail extends Vue {
    created() {
      auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        } else {
          NotebooksModule.getNotebooks()
            .then(res => {
              TrashNoteModule.getTrashNote()
                .then(res => {
                  TrashNoteModule.setCurTrashNote({curTrashNoteId: +this.$route.query.noteId});
                });
            });
        }
      });
    }
    
    get trashNotes() {
      return TrashNoteModule.trashNotes;
    }
    
    get curTrashNote() {
      return TrashNoteModule.curTrashNote;
    }
    
    get belongTo() {
      return TrashNoteModule.belongTo;
    }
    
    get compiledMarkdown() {
      return md.render(TrashNoteModule.curTrashNote.content || '');
    }
    
    onDelete() {
      this.$confirm('删除后将无法恢复', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return TrashNoteModule.deleteTrashNote(this.curTrashNote.id);
      }).then(() => {
        TrashNoteModule.setCurTrashNote();
        this.$router.replace({
          path: '/trash',
          query: {noteId: TrashNoteModule.curTrashNote.id}
        });
      });
    }
    
    onRevert() {
      TrashNoteModule.revertTrashNote(this.curTrashNote.id)
        .then(() => {
          TrashNoteModule.setCurTrashNote();
          this.$router.replace({
            path: '/trash',
            query: {noteId: TrashNoteModule.curTrashNote.id}
          });
        });
    }
    
    beforeRouteUpdate(to: { query: { noteId: string; }; }, from: any, next: () => void) {
      TrashNoteModule.setCurTrashNote({curTrashNoteId: +to.query.noteId});
      next();
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/assets/style/note-sidebar.scss";
  @import "~@/assets/style/note-content.scss";
  
  #trash {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    min-height: 100%;
    flex: 1;
    
    .note-bar {
      padding: 10.75px 20px;
      border-bottom: 1px solid #ccc;
      
      .action {
        color: #666;
        background-color: #fff;
        box-shadow: 0px 0px 2px 0px #ccc;
        cursor: pointer;
        display: inline-block;
        float: right;
        margin-left: 10px;
        padding: 2px 4px;
        font-size: 14px;
      }
    }
  }
</style>
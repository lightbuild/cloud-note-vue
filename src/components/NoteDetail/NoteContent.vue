<template>
  <div class="note-detail">
    <div class="note-empty" v-show="!curNote.id">请选择笔记本</div>
    <div class="note-detail-ct" v-show="curNote.id">
      <div class="note-header">
        <div class="note-status">
          <span>创建日期：{{ curNote.beatifyCreatedAt }}</span>
          <span>更新日期：{{ curNote.beatifyupdatedAt }}</span>
          <span>{{ statusText }}</span>
        </div>
        <div class="icon-wrapper">
          <my-icon name="fullscreen" @click="isShowPreview=!isShowPreview"></my-icon>
          <my-icon name="delete" @click="deleteNote"></my-icon>
        </div>
      </div>
      <div class="note-title">
        <input type="text" :value="curNote.title" @input="updateNoteTitle($event.target.value)"
               @keydown="statusText='正在输入中...'" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea :value="curNote.content" @keydown="statusText='正在输入中...'"
                  @input="updateNoteContent($event.target.value)"
                  placeholder="输入内容，支持markdown语法"></textarea>
        <div class="preview markdown-body" v-show="isShowPreview"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import MyIcon from '@/components/MyIcon.vue';
  import NoteModule from '@/store/modules/note';
  import _ from 'lodash';
  
  
  @Component({
    components: {MyIcon}
  })
  export default class NoteContent extends Vue {
    statusText: string | undefined;
    
    data() {
      return {
        statusText: '笔记未改动',
        isShowPreview: false,
      };
    }
    
    get curNote() {
      return NoteModule.curNote;
    }
    
    get previewContent() {
      return this.curNote.content || '';
    }
    
    deleteNote() {
      console.log(typeof (this.curNote.id)
      );
      NoteModule.deleteNote(this.curNote.id)
        .then(data => {
          this.$router.replace({path: '/note'});
        });
    }
    
    updateNoteTitle(newTitle: string) {
      const debounceUpdate = _.debounce(() => {
        NoteModule.updateNote({
          curNoteId: this.curNote.id,
          newTitle: newTitle,
          newContent: this.curNote.content
        }).then(data => {
          this.statusText = '已保存';
        });
      }, 0);
      debounceUpdate();
    }
    
    updateNoteContent(newContent: string) {
      const debounceUpdate = _.debounce(() => {
        NoteModule.updateNote({
          curNoteId: this.curNote.id,
          newTitle: this.curNote.title,
          newContent: newContent
        }).then(data => {
          this.statusText = '已保存';
        });
      }, 0);
      debounceUpdate();
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  
  .note-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .note-empty {
      font-size: 50px;
      color: #ccc;
      text-align: center;
      margin-top: 100px;
    }
    
    .note-detail-ct {
      min-height: 100%;
    }
    
    .note-header {
      font-size: 12px;
      padding: 4px 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .note-status span {
        color: #999;
        margin-right: 4px;
      }
      
      .icon-wrapper {
        cursor: pointer;
        
        .icon {
          color: #999;
          width: 1.5em;
          height: 1.5em;
          margin-right: 6px;
        }
      }
    }
    
    .note-title {
      input, span {
        display: inline-block;
        min-width: 100%;
        border: none;
        outline: none;
        font-size: 18px;
        padding: 10px 20px;
      }
    }
    
    .editor {
      height: calc(100% - 70px);
      position: relative;
      
      textarea, .preview {
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        padding: 20px;
      }
      
      textarea {
        border: none;
        resize: none;
        outline: none;
        font-size: 14px;
        font-family: $font-hei;
      }
    }
    
    code {
      color: #f66
    }
    
  }
</style>
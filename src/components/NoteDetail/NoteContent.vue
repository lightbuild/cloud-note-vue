<template>
  <div class="note-detail">
    <div class="note-empty" v-show="!curNote.id">请选择笔记本</div>
    <div class="note-detail-ct" v-show="curNote.id">
      <div class="note-header">
        <div class="note-status">
          <span>创建日期：10分钟前</span>
          <span>更新日期：2分钟前</span>
          <span>{{statusText}}</span>
        </div>
        <div class="icon-wrapper">
          <my-icon name="fullscreen" @click="isShowPreview=!isShowPreview"></my-icon>
          <my-icon name="delete" @click="deleteNote"></my-icon>
        </div>
      </div>
      <div class="note-title">
        <input type="text" value="curNote.title" @input="updateNote" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea value="curNote.content" @input="updateNote" placeholder="输入内容，支持 Markdown 语法"></textarea>
        <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import MyIcon from '@/components/MyIcon.vue';
  @Component({
    components: {MyIcon}
  })
  export default class NoteContent extends Vue {
    curNote = {
      id:1
    } as NoteBaseData;
    notes: NoteBaseData[] = [];
    statusText='笔记本未改动'
    isShowPreview=false
    
    
   
      get previewContent(){
        return this.curNote.content || ''
      }
  
    deleteNote(){
      console.log('删除标题');
    }
    
    updateNote(){
      console.log('修改标题或内容');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .note-detail{
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .note-empty{
      font-size: 50px;
      color:#ccc;
      text-align: center;
      margin-top: 100px;
    }
    
    .note-detail-ct{
      min-height: 100%;
    }
    
    .note-header{
      font-size: 12px;
      padding: 4px 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .note-status span{
        color: #999;
        margin-right: 4px;
      }
      .icon-wrapper{
        cursor: pointer;
        .icon{
          color: #999;
          width: 1.5em;
          height: 1.5em;
          margin-right: 6px;
        }
      }
    }
    .note-title{
      input,span{
        display: inline-block;
        min-width: 100%;
        border:none;
        outline:none;
        font-size:18px;
        padding:10px 20px;
      }
    }
    .editor{
      height: calc(100% - 70px);
      position: relative;
      textarea,.preview{
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        padding: 20px;
      }
      textarea{
        border: none;
        resize:none;
        outline:none;
        font-size: 14px;
        font-family: $font-hei;
      }
    }
    code{
      color:#f66
    }
    
  }
</style>
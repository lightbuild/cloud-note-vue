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
              <span class="date">{{ note.updatedAtFriendly }}</span>
              <span class="title">{{ note.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="note-detail">
        <div class="note-bar" v-if="true">
          <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
          <span> | </span>
          <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
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
  
  let md = new MarkdownIt();
  @Component({
    components: {Layout}
  })
  export default class TrashDetail extends Vue {
    created() {
      auth.getInfo().then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'});
        }
      });
    }
    
    onDelete() {
      console.log('删除');
    }
    
    onRevert() {
      console.log('恢复');
    }
    
    get compiledMarkdown() {
      return md.render(this.curTrashNote.content || '');
    }
    
    trashNotes = [{
      id: 333,
      title: '回收站1111',
      content: '哈哈哈',
      updatedAtFriendly: '1天前'
    }];
    
    curTrashNote = {
      id: 333,
      title: '回收站222',
      content: '哈哈哈',
      createdAtFriendly: '2天前',
      updatedAtFriendly: '1天前'
    };
    
    belongTo = 'test222';
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
      .action {
        float: right;
        margin-left: 10px;
        padding: 2px 4px;
        font-size: 12px;
      }
    }
  }
</style>
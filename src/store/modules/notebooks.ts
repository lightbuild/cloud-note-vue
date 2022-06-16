import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import NotebookList from '@/lib/apis/notebookList';
import {Message} from 'element-ui';
import beautifyDate from '@/lib/helper/beautifyDate';


@Module({dynamic: true, store, name: 'notebooks'})
class Notebooks extends VuexModule {
  notebooks: NListBaseData[] = [];
  bookId: number | null = null;

  get curBookId() {
    if (!Array.isArray(this.notebooks)) return {};
    if (!this.bookId) return this.notebooks[0] || {};
    return this.notebooks.find(notebook => notebook.id == this.bookId);
  }

  @Mutation
  setNotebooksM(notebooks: NListBaseData[]) {
    this.notebooks = notebooks;
  }

  @Mutation
  addNotebookM(notebook: NListBaseData) {
    this.notebooks.unshift(notebook);
  }

  @Mutation
  updateNotebooksM({notebookId, newTitle}: { notebookId: number, newTitle: string }) {
    const targetNotebook = this.notebooks.find(item => item.id == notebookId);
    targetNotebook!.title = newTitle;
  }

  @Mutation
  deleteNotebookM(notebookId: number) {
    this.notebooks = this.notebooks.filter(item => item.id !== notebookId);
  }

  @Mutation
  setCurbookM(notebook: NListBaseData) {
    this.bookId = notebook.id;
  }

  @Action
  getNotebooks() {
    return NotebookList.getAll().then(res => {
        this.context.commit('setNotebooksM', res.data);
      }
    );
  }

  @Action({rawError: true})
  addNotebook(title: { title: string }) {
    return NotebookList.addNotebook(title).then(res => {
      res.data!.beatifyCreatedAt = beautifyDate(res.data!.createdAt);
      this.context.commit('addNotebookM', res.data);
      Message.success(res.msg);
    });
  }

  @Action({rawError: true})
  deleteNotebook(notebookId: number) {
    return NotebookList.deleteNotebook(notebookId).then(res => {
      this.context.commit('deleteNotebookM', notebookId);
      Message.success(res.msg);
    });
  }

  @Action({rawError: true})
  updateNotebook({notebookId, newTitle}: { notebookId: number, newTitle: string }) {
    return NotebookList.updateNotebooks(notebookId, {title: newTitle}).then(res => {
      this.context.commit('updateNotebooksM', {notebookId, newTitle});
      Message.success(res.msg);
    });
  }
}

const NotebooksModule = getModule(Notebooks);

export default NotebooksModule;
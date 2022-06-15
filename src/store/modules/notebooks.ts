import {Action, getModule, Module, Mutation, VuexModule,MutationAction} from 'vuex-module-decorators';
import store from '@/store'
import NotebookList from '@/lib/apis/notebookList';
import note from '@/lib/apis/note';
import {Message} from 'element-ui';


@Module({ dynamic: true, store, name: 'notebooks'})
class Notebooks extends VuexModule {
  notebooks: NListBaseData[] = [];
  bookId:number|null =null
  get notebooksList(){
    return this.notebooks
  }
  get curBookId(){
    if(!Array.isArray(this.notebooks)) return{}
    if(!this.bookId) return this.notebooks[0]||{}
    return this.notebooks.find(notebook=> notebook.id == this.bookId)
  }

  @Mutation
  setNotebooksM(notebooks: NListBaseData[]){
    this.notebooks = notebooks
  }
  @Mutation
  addNotebookM(notebook:NListBaseData){
    this.notebooks.unshift(notebook)
  }
  @Mutation
  updateNotebooksM(notebook: NListBaseData){
    const targetNotebook = this.notebooks.find(item => item.id == notebook.id )
    targetNotebook!.title = notebook.title
  }
  @Mutation
  deleteNotebookM(notebook: NListBaseData){
    this.notebooks.filter(item => item.id !== notebook.id)
  }
  @Mutation
  setCurbookM(notebook: NListBaseData){
    this.bookId = notebook.id
  }

  @Action
  getNotebooks(){
    return NotebookList.getAll().then(res=>{
      this.context.commit('setNotebooksM',res.data)
      }
    )
  }
  @Action
  addNotebook(title:{title:string}){
    return NotebookList.addNotebook(title).then(res=>{
      this.context.commit('addNotebookM',res.data)
      Message.success(res.msg)
    })
  }
  @Action
  deleteNotebook(notebookId:number){
    return NotebookList.deleteNotebook(notebookId).then(res =>{
      this.context.commit('deleteNotebookM',notebookId)
      Message.success(res.msg)
    })
  }
  @Action
  updateNotebook(notebookId:number,title:{title:string}){
    return NotebookList.updateNotebooks(notebookId,title).then(res =>{
      this.context.commit('updateNotebooksM',res.data)
      Message.success(res.msg)
    })
  }
}

const NotebooksModule = getModule(Notebooks)

export default NotebooksModule
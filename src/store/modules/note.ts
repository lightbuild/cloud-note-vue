import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import Note from '@/lib/apis/note';
import {Message} from 'element-ui';

@Module({dynamic: true, store, name: 'note'})
class Notebooks extends VuexModule {
  noteList: NoteBaseData[] =[]
  curNoteId:number|null = null;

  get curNote():{[key: string]: any}{
    if(!Array.isArray(this.noteList)) return {}
    if(!this.curNoteId) return this.noteList[0] || {}
    return this.noteList.find(item => item.id === this.curNoteId) || {}
  }
  @Mutation
  setNoteM(notes:NoteBaseData[]){
    this.noteList = notes
  }
  @Mutation
  addNoteM(newNote:NoteBaseData){
    this.noteList.unshift(newNote);
  }
  @Mutation
  updateNoteM(){}
  @Mutation
  deleteNoteM(){}
  @Mutation
  setCurNote({curNoteId}: { curNoteId: number }){
    this.curNoteId= curNoteId
  }

  @Action({rawError: true})
  setNote(curId:string){
    Note.getAll({notebookId:curId})
      .then(res=>{
      this.context.commit('setNoteM',res.data)
    })
  }

  @Action({rawError: true})
  addNote({curId,newTitle,newContent}:{curId:number,newTitle:string,newContent:string}){
    Note.addNotebook({notebookId:curId},{title:newTitle,content:newContent})
      .then(res => {
        this.context.commit('addNoteM',res.data)
        Message.success(res.msg);
      })
  }
  @Action({rawError: true})
  updateNote(){}
  @Action({rawError: true})
  deleteNote(){}
}

const NoteModule = getModule(Notebooks)

export default NoteModule
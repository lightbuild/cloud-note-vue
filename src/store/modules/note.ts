import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import Note from '@/lib/apis/note';
import {Message} from 'element-ui';
import notebooks from '@/store/modules/notebooks';

@Module({dynamic: true, store, name: 'note'})
class Notebooks extends VuexModule {
  noteList: NoteBaseData[] =[]

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

  @Action
  setNote(curId:string){
    Note.getAll({notebookId:curId})
      .then(res=>{
      this.context.commit('setNoteM',res.data)
    })
  }

  @Action
  addNote({curId,newTitle,newContent}:{curId:number,newTitle:string,newContent:string}){
    Note.addNotebook({notebookId:curId},{title:newTitle,content:newContent})
      .then(res => {
        this.context.commit('addNoteM',res.data)
        Message.success(res.msg);
      })
  }
  @Action
  updateNote(){}
  @Action
  deleteNote(){}
}

const NoteModule = getModule(Notebooks)

export default NoteModule
import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import Note from '@/lib/apis/note';
import {Message} from 'element-ui';
@Module({dynamic: true, store, name: 'note'})
class Notebooks extends VuexModule {

  noteList: NoteBaseData[] = [];
  curNoteId: number | null = null;

  get curNote(): { [key: string]: any } {
    if (!Array.isArray(this.noteList)) return {};
    if (!this.curNoteId) return this.noteList[0] || {};
    return this.noteList.find(note => note.id === this.curNoteId) || {};
  }

  @Mutation
  setNoteM(notes: NoteBaseData[]) {
    this.noteList = notes;
  }

  @Mutation
  addNoteM(newNote: NoteBaseData) {
    this.noteList.unshift(newNote);
  }

  @Mutation
  updateNoteM({curNoteId,newTitle, newContent}: {curNoteId:number,newTitle: string, newContent: string }) {
    const note = this.noteList.find(note => note.id === curNoteId);
    note!.title = newTitle;
    note!.content = newContent;
  }

  @Mutation
  deleteNoteM(curNoteId:number) {
    this.noteList=this.noteList.filter(note => note.id !== curNoteId)
  }

  @Mutation
  setCurNote({curNoteId}: { curNoteId: number }) {
    this.curNoteId = curNoteId;
  }

  @Action({rawError: true})
  setNote(curBookId: string) {
    return Note.getAll({notebookId: curBookId})
      .then(res => {
        this.context.commit('setNoteM', res.data);
      });
  }

  @Action({rawError: true})
  addNote({curBookId, newTitle, newContent}: { curBookId: number, newTitle: string, newContent: string }) {
    return Note.addNote({notebookId: curBookId}, {title: newTitle, content: newContent})
      .then(res => {
        this.context.commit('addNoteM', res.data);
        Message.success(res.msg);
      });
  }

  @Action({rawError: true})
  updateNote({curNoteId,newTitle, newContent}: {curNoteId:number,newTitle: string, newContent: string }){
   return Note.updateNote({noteId: curNoteId}, {title: newTitle, content: newContent})
      .then(res => {
        this.context.commit('updateNoteM', {curNoteId,newTitle, newContent});
      });
  }

  @Action({rawError: true})
  deleteNote(curNoteId:number) {
    return Note.deleteNote({noteId:curNoteId})
      .then(res => {
        this.context.commit('deleteNoteM',curNoteId);
        Message.success(res.msg);
      })
  }
}

const NoteModule = getModule(Notebooks);

export default NoteModule;
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
    const curNote = this.noteList.find(note => note.id === curNoteId);
    curNote!.title = newTitle;
    curNote!.content = newContent;
  }

  @Mutation
  deleteNoteM() {
    console.log('删除功能');
  }

  @Mutation
  setCurNote({curNoteId}: { curNoteId: number }) {
    this.curNoteId = curNoteId;
  }

  @Action({rawError: true})
  setNote(curBookId: string) {
    Note.getAll({notebookId: curBookId})
      .then(res => {
        this.context.commit('setNoteM', res.data);
      });
  }

  @Action({rawError: true})
  addNote({curBookId, newTitle, newContent}: { curBookId: number, newTitle: string, newContent: string }) {
    Note.addNote({notebookId: curBookId}, {title: newTitle, content: newContent})
      .then(res => {
        this.context.commit('addNoteM', res.data);
        Message.success(res.msg);
      });
  }

  @Action({rawError: true})
  updateNote({curNoteId,newTitle, newContent}: {curNoteId:number,newTitle: string, newContent: string }){
    Note.updateNote({noteId: curNoteId}, {title: newTitle, content: newContent})
      .then(res => {
        this.context.commit('updateNoteM', {curNoteId,newTitle, newContent});
      });
  }

  @Action({rawError: true})
  deleteNote() {}
}

const NoteModule = getModule(Notebooks);

export default NoteModule;
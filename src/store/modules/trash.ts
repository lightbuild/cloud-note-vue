import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {Message} from 'element-ui';
import Trash from '@/lib/apis/trash';
import NotebooksModule from '@/store/modules/notebooks';
import notebooks from '@/store/modules/notebooks';
import Note from '@/lib/apis/note';
import NoteModule from '@/store/modules/note';

@Module({dynamic: true, store, name: 'trash'})
class Notebooks extends VuexModule {
  trashNotes: NoteBaseData[] = [];
  curTrashNoteId: number | null = null;
  get curTrashNote(): { [key: string]: any }{
    if(!this.curTrashNoteId) return this.trashNotes[0] || {}
    return this.trashNotes.find(item => item.id === this.curTrashNoteId) || {}
  }
  get belongTo(){
    const notebook = NotebooksModule.notebooks.find(notebook => notebook.id === this.curTrashNote.notebookId)
    return notebook?.title || {}
  }

  @Mutation
  setTrashNoteM(notes: NoteBaseData[]) {
    this.trashNotes = notes;
  }

  @Mutation
  addTrashNoteM(newNote: NoteBaseData) {
    this.trashNotes.unshift(newNote);
  }

  @Mutation
  deleteTrashNoteM(curNoteId:number) {
    this.trashNotes = this.trashNotes.filter(note => note.id !== curNoteId)
  }

  @Mutation
  setCurTrashNote({curTrashNoteId}: { curTrashNoteId: number | null}) {
    this.curTrashNoteId = curTrashNoteId;
  }

  @Action({rawError: true})
  getTrashNote() {
    return Trash.getAll()
      .then(res => {
        this.context.commit('setTrashNoteM', res.data);
      });
  }

  @Action({rawError: true})
  deleteTrashNote(curTrashNoteId:number) {
    return Trash.deleteNote({noteId:curTrashNoteId})
      .then(res => {
        this.context.commit('deleteTrashNoteM',curTrashNoteId);
        Message.success(res.msg);
      })
  }

  @Action({rawError: true})
  revertTrashNote(curTrashNoteId:number) {
    return Trash.revertNote({noteId:curTrashNoteId})
      .then(res => {
        // this.context.commit('deleteTrashNoteM',curTrashNoteId);
        console.log('恢复成功');
        Message.success(res.msg);
      })
  }
}

const TrashNoteModule = getModule(Notebooks);

export default TrashNoteModule;
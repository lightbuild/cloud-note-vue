import request from '@/lib/helper/require';
import beautifyDate from '@/lib/helper/beautifyDate';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/note/:noteId',
  DELETE: 'note/:noteId'
};

export default {
  getAll({notebookId}: { notebookId: string }) {
    return new Promise<NoteData>((resolve, reject) => {
      request<NoteData>(URL.GET.replace(':notebookId', notebookId))
        .then(res => {
          res.data = res.data!.map(note => {
            note.beatifyCreatedAt = beautifyDate(note.createdAt);
            note.beatifyUpdateAt = beautifyDate(note.updatedAt);
            return note;
          }).sort((note1, note2) => note1.updatedAt < note2.updatedAt ? -1 : 1);
          resolve(res);
        }).catch(err => {
        reject(err.msg);
      });
    });
  },

  updateNotebooks({noteId}: { noteId: string }, {title, content}: { title: string, content: string }) {
    return request<NoteModifyData>(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content});
  },

  deleteNotebook({noteId}: { noteId: string }) {
    return request<NoteModifyData>(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },
  addNotebook({notebookId}: { notebookId: string }, {title = '', content = ''} = {}) {
    return new Promise<NoteModifyData>((resolve, reject) => {
      request<NoteModifyData>(URL.ADD.replace(':notebookId', notebookId))
        .then(res => {
          res.data!.beatifyCreatedAt = beautifyDate(res.data?.createdAt);
          res.data!.beatifyUpdateAt = beautifyDate(res.data?.updatedAt);
          resolve(res);
        }).catch(err => {
        reject(err.msg);
      });
    });
  }
};
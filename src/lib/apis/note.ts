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
    return new Promise<NoteResponse>((resolve, reject) => {
      request<NoteResponse>(URL.GET.replace(':notebookId', notebookId))
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

  updateNotebooks({noteId}: { noteId: number }, {title, content}: { title: string, content: string }) {
    return request<NoteModifyResponse>(URL.UPDATE.replace(':noteId', noteId.toString()), 'PATCH', {title, content});
  },

  deleteNotebook({noteId}: { noteId: string }) {
    return request<NoteModifyResponse>(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },
  addNotebook({notebookId}: { notebookId: number }, {title = '', content = ''} = {}) {
    return new Promise<NoteModifyResponse>((resolve, reject) => {
      request<NoteModifyResponse>(URL.ADD.replace(':notebookId', notebookId.toString()),'POST',{title,content})
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
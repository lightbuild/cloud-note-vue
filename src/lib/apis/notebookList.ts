import request from '@/lib/helper/require';
import beautifyDate from '@/lib/helper/beautifyDate';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: 'notebooks/:id'
};

export default{
  getAll(){
    return new Promise<NotebooksListData>((resolve, reject)=>{
      request<NotebooksListData>(URL.GET)
        .then(res=>{
          res.data = res.data && res.data.sort((notebook1,notebook2)=> notebook1.createdAt < notebook2.createdAt ? -1 :1)
          res.data?.forEach(notebook=>{
            notebook.beatifyCreatedAt = beautifyDate(notebook.createdAt)
          })
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  },

  updateNotebooks(notebookId:any,{title=''}={}){
      return request<NotebooksModifyData>(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },

  deleteNotebook(notebookId:any){
    return request<NotebooksModifyData>(URL.DELETE.replace(':id',notebookId),'DELETE')
  },
  addNotebook({title=''}={}){
    return request<NotebooksModifyData>(URL.ADD,'POST',{title})
  }
}
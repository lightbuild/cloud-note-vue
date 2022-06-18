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
    return new Promise<NListResponse>((resolve, reject)=>{
      request<NListResponse>(URL.GET)
        .then(res=>{
          res.data = res.data && res.data.sort((notebook1,notebook2)=> notebook1.createdAt < notebook2.createdAt ? 1 :-1)
          res.data?.forEach(notebook=>{
            notebook.beatifyCreatedAt = beautifyDate(notebook.createdAt)
          })
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  },

  updateNotebooks(notebookId:number,{title=''}={}){
      return request<NotebooksModifyData>(URL.UPDATE.replace(':id',notebookId.toString()),'PATCH',{title})
  },

  deleteNotebook(notebookId:number){
    return request<NotebooksModifyData>(URL.DELETE.replace(':id',notebookId.toString()),'DELETE')
  },
  addNotebook({title=''}={}){
    return new Promise<NotebooksModifyData>((resolve, reject) =>{
        request<NotebooksModifyData>(URL.ADD,'POST',{title})
          .then(res=>{
              res.data!.beatifyCreatedAt = beautifyDate(res.data!.createdAt);
              resolve(res);
          }).catch(err => {
            reject(err)
        })
    })
  }
}
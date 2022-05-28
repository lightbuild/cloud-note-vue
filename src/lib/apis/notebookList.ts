import request from '@/lib/helper/require';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: 'notebooks/:id'
};

export default{
  getAll(){
    return request<NotebooksListData>(URL.GET)
  },

  updateNotebooks(notebookId:any,title:string){
      return request<NotebooksModifyData>(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },

  deleteNotebook(notebookId:any){
    return request<NotebooksModifyData>(URL.DELETE.replace(':id',notebookId),'DELETE')
  },
  addNotebook(title:string){
    return request<NotebooksModifyData>(URL.ADD,'POST',{title})
  }
}
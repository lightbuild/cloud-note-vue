import request from '@/lib/helper/require';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: 'notebooks/:id'
};

export default{
  getAll(){
  return new Promise((resolve,reject)=>{
    request(URL.GET)
      .then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
    })
  })
  },

  updateNotebooks(notebookId:any,{title=''}={title:''}){
      return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },

  deleteNotebook(notebookId:any){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  },
  addNotebook({title=''} = {title:''}){
    return request(URL.ADD,'POST',{title})
  }
}
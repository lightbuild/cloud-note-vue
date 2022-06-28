import require from '@/lib/helper/require'
import beautifyDate from '@/lib/helper/beautifyDate';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll(){
    return new Promise<TrashResponse>((resolve, reject) => {
      require<TrashResponse>(URL.GET)
        .then(res => {
          res.data = res.data?.sort((notebook1,notebook2)=> notebook1.createdAt < notebook2.createdAt ? -1 :1)
          res.data?.forEach(notebook=>{
            notebook.beatifyCreatedAt = beautifyDate(notebook.createdAt)
            notebook.beatifyUpdateAt = beautifyDate(notebook.updatedAt)
          })
          resolve(res)
        }).catch(err=>reject(err))
    })
  },
  deleteNote({noteId}:{noteId:number}){
    return require<TrashModifyResponse>(URL.DELETE.replace(':noteId',noteId.toString()),'DELETE')
  },
  revertNote({noteId}:{noteId:number}){
    return require<TrashModifyResponse>(URL.REVERT.replace(':noteId',noteId.toString()),'PATCH')
  }
}
interface UserItem {
  username: string,
  password: string,
  notice: string,
  isError: boolean
}

interface UserData {
  isShowLogin: boolean,
  isShowRegister: boolean,
  login: UserItem,
  register: UserItem,
}

type BaseData = {
  id: number,
  username: string,
  updatedAt: string,
  createdAt: string
}

interface RegisterData {
  msg: string,
  data?: BaseData
}

interface AuthData {
  isLogin: boolean,
  data?: BaseData
}

interface AuthLogoutData {
  msg: string;
}

interface AuthLoginData {
  msg: string,
  data?: BaseData
}

type NotebooksListBaseData = {
  id: number,
  noteCounts:number,
  title: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
  beatifyCreatedAt?:string
}

interface NotebooksListData {
  msg: string,
  data?: NotebooksListBaseData[]
}

interface NotebooksModifyData {
  msg:string,
  data?:NotebooksListBaseData
}

type NoteBaseData = {
  isDelete:boolean,
  id:number,
  title:string,
  content:string,
  userId:string,
  updatedAt:string,
  createdAt:string,
  beatifyCreatedAt?:string
  beatifyUpdateAt?:string
}

interface NoteData {
  msg?:string
  data?:NoteBaseData[]
}

interface NoteModifyData {
  msg: string,
  data?: NoteBaseData
}


interface TrashData {
  msg:string,
  data?:NoteBaseData[]
}
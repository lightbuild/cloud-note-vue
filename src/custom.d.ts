type UserItem = {
  username: string,
  password: string,
  notice: string,
  isError: boolean
}
type userInput = {
  username: string,
  password: string
}

type UserBaseData = {
  id: number,
  username: string,
  updatedAt: string,
  createdAt: string
}

interface RegisterResponse {
  msg: string,
  data?: UserBaseData
}

interface LoginResponse {
  msg: string,
  data?: UserBaseData
}

interface AuthResponse {
  isLogin: boolean,
  data?: UserBaseData
}

interface LogoutResponse {
  msg: string;
}



type NListBaseData = {
  id: number,
  noteCounts:number,
  title: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
  beatifyCreatedAt?:string
}

interface NListResponse {
  msg: string,
  data?: NListBaseData[]
}

interface NotebooksModifyData {
  msg:string,
  data?:NListBaseData
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

interface NoteResponse {
  msg?:string
  data?:NoteBaseData[]
}

interface NoteModifyResponse {
  msg: string,
  data?: NoteBaseData
}


interface TrashResponse {
  msg:string,
  data?:NoteBaseData[]
}
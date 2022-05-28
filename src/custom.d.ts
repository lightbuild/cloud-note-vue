interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  message: string;
}


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
  id?: number,
  title?: string,
  userId?: number,
  createdAt?: string,
  updatedAt?: string
}

interface NotebooksListData {
  msg: string,
  data?: NotebooksListBaseData[]
}

interface NotebooksModifyData {
  msg:string,
  data?:NotebooksListBaseData
}

type NotebooksBaseData = {
  isDelete?:boolean,
  id?:number,
  title?:string,
  content?:string,
  userId?:string,
  updatedAt?:string,
  createdAt?:string
}

interface NotebooksData {
  msg:string,
  data?:NotebooksBaseData[]
}

interface NotebookModifyData {
  msg: string,
  data?: NotebooksBaseData
}


interface TrashData {
  msg:string,
  data?:NotebooksBaseData[]
}
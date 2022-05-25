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


import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import Auth from '@/lib/apis/auth';

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule {
  loginUser: UserBaseData|null = null;

  get username(): string {
    return this.loginUser === null ? '未登录' : this.loginUser.username;
  }

  get slug(): string {
    return this.loginUser === null ? '未' : this.loginUser.username[0];
  }

  @Mutation
  setUser(newUser: UserBaseData): void {
    this.loginUser = newUser;
  }

  @Action
  login({username, password}: userInput) {
    return Auth.login({username, password})
      .then(res => {
        this.context.commit('setUser', res.data);
      });
  }

  @Action
  register({username, password}: userInput) {
    return Auth.register({username, password})
      .then(res => {
        this.context.commit('setUser', res.data);
      });
  }

  @Action
  checkLogin() {
    return Auth.getInfo().then(res => {
      if(res.isLogin){
        this.context.commit('setUser', res.data);
      }
      return res
    });
  }
}


const UserModule = getModule(User);
export default UserModule;
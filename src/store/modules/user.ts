import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store'
import router from '@/router';
import Auth from '@/lib/apis/auth';
type User = UserBaseData | null
@Module({ dynamic: true, store, name: 'user' })
export default class user extends VuexModule {
  user :User = null;
  get username() :string{
    return  this.user === null ? '未登录' : this.user.username
  }
  get slug():string{
    return this.user === null ? '未':this.user.username[0];
  }

  @Mutation
  setUser(newUser:UserBaseData):void{
    this.user = newUser;
  }

  @Action
  login({username,password}:userInput){
   return Auth.login({username,password})
     .then(res =>{
      this.context.commit('setUser',res.data)
    })
  }
  @Action
  register({username,password}:userInput){
    return Auth.register({username,password})
      .then(res =>{
      this.context.commit('setUser',res.data)
    })
  }
  @Action
  checklogin(){
    return Auth.getInfo().then(res =>{
      if(!res.isLogin){
        console.log('jump');
        router.push('/login')
      }else{
        this.context.commit('setUser',res.data)
      }
    })
  }
}
import router from '@utils/router/router';
import store from '@utils/store';
import api from '../api/api';
import { ILoginUserModel, ISignUpUserModel } from '../types';
import chatsController from './chats-controller';

class AuthController {
  public getUser() {
    api.auth.get().then((data) => {
      store.set('user', data);
    });
  }

  public signUp(model: ISignUpUserModel) {
    api.auth.signup(model)
      .then(() => {
        router.go('/chats');
      })
      .then(this.getUser)
      .then(chatsController.getList);
  }

  public signIn(model: ILoginUserModel) {
    api.auth.signin(model)
      .then(() => {
        router.go('/chats');
      })
      .then(this.getUser)
      .then(chatsController.getList);
  }

  public logout() {
    api.auth.logout().then(() => {
      router.go('/login');
      store.reset();
    });
  }
}

const authController = new AuthController();

export default authController;

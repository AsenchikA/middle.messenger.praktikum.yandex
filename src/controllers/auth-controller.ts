import api from '~src/api/api';
import { ILoginUserModel, ISignUpUserModel } from '~src/types';
import router from '~src/utils/router/router';
import store from '~src/utils/store';

class AuthController {
  public getUser() {
    api.auth.get().then((data) => {
      store.set('user', data);
    });
  }

  public signUp(model: ISignUpUserModel) {
    api.auth.signup(model).then(() => {
      router.go('/chats');
    });
  }

  public signIn(model: ILoginUserModel) {
    api.auth.signin(model).then(() => {
      router.go('/chats');
    });
  }

  public logout() {
    api.auth.logout().then(() => {
      router.go('/login');
    });
  }
}

const authController = new AuthController();

export default authController;

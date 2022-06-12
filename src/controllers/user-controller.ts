import api from '../api/api';
import { ISavingUserModel } from '../types';
import router from '../utils/router/router';
import authController from './auth-controller';

class UserController {
  public saveUserProfile(model: ISavingUserModel) {
    return api.user.saveUserProfile(model)
      .then(() => authController.getUser())
      .then(() => {
        router.go('/profile');
      });
  }

  public saveUserAvatar(form: FormData) {
    return api.user.saveUserAvatar(form);
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return api.user.changePassword(oldPassword, newPassword)
      .then(() => {
        router.go('/profile');
      });
  }
}

const userController = new UserController();

export default userController;

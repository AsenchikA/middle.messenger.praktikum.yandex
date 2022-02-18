import api from '~src/api/api';
import { ISavingUserModel } from '~src/types';
import router from '~src/utils/router/router';
import authController from './auth-controller';

class UserController {
  public saveUserProfile(model: ISavingUserModel) {
    return api.user.saveUserProfile(model)
      .then(() => authController.getUser())
      .then(() => {
        router.go('/profile');
      });
  }

  public saveUserAvatar(form) {
    return api.user.saveUserAvatar(form);
  }
}

const userController = new UserController();

export default userController;

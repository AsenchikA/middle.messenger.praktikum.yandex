import { ISavingUserModel } from '~src/types';
import { HTTPTransport, METHOD_TYPES } from '~src/utils/request/request';

const userApiInstance = new HTTPTransport('/user');

export default class UserApi {
  public saveUserProfile(model: ISavingUserModel) {
    return userApiInstance.put('/profile', model);
  }

  public saveUserAvatar(form) {
    return userApiInstance.put('/profile/avatar', form, { method: METHOD_TYPES.PUT, withoutContentType: true });
  }

  public searchByLogin(login: string) {
    return userApiInstance.post('/search', { login }).then((data) => JSON.parse(data));
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return userApiInstance.put('/password', { oldPassword, newPassword });
  }
}

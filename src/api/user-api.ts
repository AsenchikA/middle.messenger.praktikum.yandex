import { HTTPTransport, METHOD_TYPES } from '@utils/request/request';
import { ISavingUserModel } from '../types';

const userApiInstance = new HTTPTransport('/user');

export default class UserApi {
  public saveUserProfile(model: ISavingUserModel) {
    return userApiInstance.put('/profile', model);
  }

  public saveUserAvatar(form: FormData) {
    return userApiInstance.put('/profile/avatar', form, { method: METHOD_TYPES.PUT, withoutContentType: true });
  }

  public searchByLogin(login: string) {
    return userApiInstance.post<string>('/search', { login }).then((data) => JSON.parse(data));
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return userApiInstance.put('/password', { oldPassword, newPassword });
  }
}

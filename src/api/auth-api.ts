import { ILoginUserModel, ISignUpUserModel } from '../types';
import { HTTPTransport } from '../utils/request/request';

const authApiInstance = new HTTPTransport('/auth');

export default class AuthApi {
  public signup(model: ISignUpUserModel) {
    return authApiInstance.post('/signup', model).then((response: { id: number }) => response.id);
  }

  public signin(model: ILoginUserModel) {
    return authApiInstance.post('/signin', { ...model });
  }

  public get() {
    return authApiInstance.get('/user').then((data) => JSON.parse(data));
  }

  public logout() {
    return authApiInstance.post('/logout', { });
  }
}

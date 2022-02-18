import AuthApi from './auth-api';
import ChatsApi from './chats-api';
import UserApi from './user-api';

class Api {
  public auth = new AuthApi();

  public chats = new ChatsApi();

  public user = new UserApi();
}

const api = new Api();

export default api;

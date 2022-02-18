import { HTTPTransport } from '~src/utils/request';

const chatsApiInstance = new HTTPTransport('/chats');

export default class ChatsApi {
  public getList() {
    return chatsApiInstance.get('/').then((data) => JSON.parse(data));
  }

  public create(title: string) {
    return chatsApiInstance.post('/', { title });
  }
}

import { HTTPTransport } from '~src/utils/request';
import WebSocketConnection from '~src/utils/webSocket';

const chatsApiInstance = new HTTPTransport('/chats');

export default class ChatsApi {
  private _openSocketConnection: WebSocketConnection;

  public getList() {
    return chatsApiInstance.get('/').then((data) => JSON.parse(data));
  }

  public create(title: string) {
    return chatsApiInstance.post('/', { title });
  }

  public addToChat(users: number[], chatId: number) {
    return chatsApiInstance.put('/users', { users, chatId });
  }

  public removeFromChat(users: number[], chatId: number) {
    return chatsApiInstance.delete('/users', { users, chatId });
  }

  public remove(chatId: number) {
    return chatsApiInstance.delete('/', { chatId });
  }

  public getChatUsers(chatId: number) {
    return chatsApiInstance.get(`/${chatId}/users`).then((data) => JSON.parse(data));
  }

  public getToken(chatId: number) {
    return chatsApiInstance.post(`/token/${chatId}`).then((data) => JSON.parse(data)?.token);
  }

  public openChatConnection(userId: number, chatId: number, tokenValue: string, onMessagesGet: (messages: IFullMessageModel[]) => void) {
    this._openSocketConnection = new WebSocketConnection({ userId, chatId, tokenValue, onMessagesGet });
  }

  public sendMessage(message: string) {
    this._openSocketConnection.sendMessage(message);
  }
}

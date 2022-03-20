import api from '../api/api';
import { IFormattedFullMessageModel, IFullMessageModel, IFullUserModel } from '../types';
import store from '../utils/store';

class ChatsController {
  public getList() {
    api.chats.getList().then((data) => {
      store.set('chats', data);
    });
  }

  public create(title: string) {
    return api.chats.create(title).then(() => {
      this.getList();
    });
  }

  public addToChat(login: string, chatId: number) {
    return api.user.searchByLogin(login)
      .then((userList: IFullUserModel[]) => userList[0]?.id)
      .then((userId: number | undefined) => {
        if (userId) {
          api.chats.addToChat([userId], chatId).then(() => {
            this.getChatUsers(chatId);
          });
        }
      });
  }

  public removeFromChat(login: string, chatId: number) {
    return api.user.searchByLogin(login)
      .then((userList: IFullUserModel[]) => userList[0]?.id)
      .then((userId: number | undefined) => {
        if (userId) {
          api.chats.removeFromChat([userId], chatId).then(() => {
            this.getChatUsers(chatId);
          });
        }
      });
  }

  public remove(chatId: number) {
    return api.chats.remove(chatId).then(() => {
      store.set('activeChatId', 0);
      this.getList();
    });
  }

  public getChatUsers(chatId: number) {
    return api.chats.getChatUsers(chatId).then((users) => {
      store.set('currentChatUserList', users);
    });
  }

  public changeActiveChatId(chatId: number) {
    const { user } = store.getState();

    store.set('activeChatId', chatId);
    store.set('messagesHistory', []);
    this.getChatUsers(chatId);
    api.chats.getToken(chatId)
      .then((token) => {
        api.chats.openChatConnection(
          (user as IFullUserModel).id,
          chatId,
          token,
          this.saveMessagesHistory,
        );
      });
  }

  public sendMessage(message: string) {
    api.chats.sendMessage(message);
  }

  public saveMessagesHistory(messages: IFullMessageModel[]) {
    const { messagesHistory, user } = store.getState();
    const userId = (user as IFullUserModel).id;
    const updatedMessages: IFormattedFullMessageModel[] = messages.reverse().map((message) => ({
      ...message,
      isMine: userId === message.user_id,
      time: new Date(message.time).toLocaleTimeString(),
    }));
    store.set('messagesHistory', messagesHistory.concat(updatedMessages));
  }
}

const chatsController = new ChatsController();

export default chatsController;

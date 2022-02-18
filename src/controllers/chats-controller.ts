import api from '~src/api/api';
import store from '~src/utils/store';

class ChatsController {
  public getList() {
    api.chats.getList().then((data) => {
      store.set('chats', data);
    });
  }

  public create(title: string) {
    api.chats.create(title).then(() => {
      this.getList();
    });
  }
}

const chatsController = new ChatsController();

export default chatsController;

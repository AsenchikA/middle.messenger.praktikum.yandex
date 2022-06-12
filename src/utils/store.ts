import { IChatModel, IFormattedFullMessageModel, IFullUserModel } from '../types';
import EventBus from './event-bus';
import set from './set';

export interface IRootState {
  activeChatId: number;
  chats: IChatModel[];
  currentChatUserList: IFullUserModel[];
  messagesHistory: IFormattedFullMessageModel[];
  user: IFullUserModel | null;
}

export enum STORE_EVENTS {
  UPDATED = 'updated',
}

const getDefaultState: () => IRootState = () => ({
  activeChatId: 0,
  chats: [],
  currentChatUserList: [],
  messagesHistory: [],
  user: null,
});

class Store extends EventBus {
  private state: IRootState = getDefaultState();

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }

  public reset() {
    this.state = getDefaultState();
  }
}

export default new Store();

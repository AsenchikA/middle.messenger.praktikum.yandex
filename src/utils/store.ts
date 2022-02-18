import { IChatModel, IEditableUserModel } from '~src/types';
import EventBus from './event-bus';
import set from './set';

export interface IRootState {
  chats: IChatModel[];
  user: IEditableUserModel | null;
}

export enum STORE_EVENTS {
  UPDATED = 'updated',
}

class Store extends EventBus {
  private state: IRootState = {
    chats: [],
    user: null,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

export default new Store();

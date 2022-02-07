import ChatList from '~src/pages/chats/components/chat-list/chat-list';
import Block from '~src/utils/block';
import chatsTemplate from './chats.template';
import ChatWindow from './components/chat-window/chat-window';

export default class Chats extends Block {
  constructor() {
    super('div');

    this.setState({ activeChatId: null });
  }

  protected getChildren(): Record<string, Block> {
    const chatList = new ChatList({
      onChatClick: (id: number) => this.setState({ activeChatId: id }),
    });
    const chatWindow = new ChatWindow();

    return {
      chatList,
      chatWindow,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chats-container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatsTemplate, { activeChatId: this.state.activeChatId });
  }
}

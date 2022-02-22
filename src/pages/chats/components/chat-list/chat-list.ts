import * as pug from 'pug';
import chatsController from '~src/controllers/chats-controller';
import { IChatModel } from '~src/types';
import Block from '~src/utils/block';
import connect from '~src/utils/connect';
import isEqual from '~src/utils/is-equal';
import store, { IRootState } from '~src/utils/store';
import ChatCard from '../chat-card/chat-card';
import chatListTemplate from './chat-list.template';

interface IChatListProps {
  onChatClick: (id: number) => void;
}

interface IMapStateToProps {
  chatList: IChatModel[];
}

type TChatListProps = IChatListProps & IMapStateToProps;

class ChatList extends Block<TChatListProps> {
  constructor(props: TChatListProps) {
    super('div', props);
  }

  public componentDidUpdate(oldProps: TChatListProps, newProps: TChatListProps): boolean {
    if (!isEqual(oldProps.chatList, newProps.chatList)) {
      this.children = this.getChildren();
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
    return !isEqual(oldProps, newProps);
  }

  protected getChildren(): Record<string, Block> {
    return this.getChatList();
  }

  public getChatList() {
    const namedChatList = this.props.chatList.map((chatItem) => ([
      `chat${chatItem.id}`,
      new ChatCard({
        name: chatItem.title,
        message: chatItem.last_message ? `${chatItem.last_message.user.first_name}: ${chatItem.last_message.content}` : '',
        onClick: () => {
          chatsController.changeActiveChatId(chatItem.id);
        },
      }),
    ]));

    return Object.fromEntries(namedChatList);
  }

  public compile(template: string, props?: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = document.createElement('template');
    const compiledFunction = pug.compile(template);

    fragment.innerHTML = compiledFunction({ chatList: Object.values(propsAndStubs) });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      const childContent = child.getContent();
      if (childContent) {
        stub?.replaceWith(childContent);
      }
    });

    return fragment.content;
  }

  public render(): DocumentFragment {
    return this.compile(chatListTemplate);
  }
}

function mapStateToProps(state: IRootState) {
  return {
    chatList: state.chats,
  };
}

export default connect(mapStateToProps)(ChatList);

import * as pug from 'pug';
import chatsController from '@controllers/chats-controller';
import Block from '@utils/block/block';
import connect from '@utils/connect';
import isEqual from '@utils/is-equal';
import { IRootState } from '@utils/store';
import { IChatModel } from '../../../../types';
import ChatCard from '../chat-card/chat-card';
import chatListTemplate from './chat-list.template';
import './chat-list.css';

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

export default connect<IMapStateToProps, IChatListProps>(mapStateToProps)(ChatList);

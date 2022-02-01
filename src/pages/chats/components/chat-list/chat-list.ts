import * as pug from 'pug';
import Block from '~src/utils/block';
import ChatCard from '../chat-card/chat-card';
import chatListTemplate from './chat-list.template';

const testChatList = [
  {
    name: 'Андрей',
    message: 'Друзья',
    id: 1,
  },
  {
    name: 'Вадим',
    message: 'Круто!',
    id: 2,
  },
  {
    name: '1, 2, 3',
    message: 'Миллионы!',
    id: 3,
  },
  {
    name: 'Настя',
    message: 'Я усталь :(',
    id: 4,
  },
];

interface IChatListProps {
  onChatClick: (id: number) => void;
}

export default class ChatList extends Block<IChatListProps> {
  constructor(props: IChatListProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block> {
    return this.getChatList();
  }

  public getChatList() {
    const namedChatList = testChatList.map((chatItem) => ([
      `chat${chatItem.id}`,
      new ChatCard({
        name: chatItem.name,
        message: chatItem.message,
        events: {
          click: () => {
            this.props.onChatClick(chatItem.id);
          },
        },
      }),
    ]));

    return Object.fromEntries(namedChatList);
  }

  public compile(template: string, props?: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    if (this.children) {
      Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      });
    }

    const fragment = document.createElement('template');
    const compiledFunction = pug.compile(template);

    fragment.innerHTML = compiledFunction({ chatList: Object.values(propsAndStubs) });

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        const childContent = child.getContent();
        if (childContent) {
          stub?.replaceWith(childContent);
        }
      });
    }

    return fragment.content;
  }

  public render(): DocumentFragment {
    return this.compile(chatListTemplate);
  }
}

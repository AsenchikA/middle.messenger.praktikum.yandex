import Button, { EButtonAppearance } from '~src/components/button/button';
import ValidatedInput from '~src/components/validated-input/validated-input';
import authController from '~src/controllers/auth-controller';
import chatsController from '~src/controllers/chats-controller';
import ChatList from '~src/pages/chats/components/chat-list/chat-list';
import Block from '~src/utils/block/block';
import connect from '~src/utils/connect';
import router from '~src/utils/router/router';
import { IRootState } from '~src/utils/store';
import { VALIDATION_NAMES } from '~src/utils/validation';
import chatsTemplate from './chats.template';
import ChatWindow from './components/chat-window/chat-window';

interface IChatsProps {
  activeChatId: number;
}

class Chats extends Block<IChatsProps> {
  constructor(props: IChatsProps) {
    super('div', props);
    chatsController.getList();
    authController.getUser();
  }

  protected getChildren(): Record<string, Block> {
    const profileButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Профиль',
      className: 'sidebar__profile-link',
      onClick: () => {
        router.go('/profile');
      },
    });

    const chatList = new ChatList({
      onChatClick: (id: number) => this.setState({ activeChatId: id }),
    });

    const chatWindow = new ChatWindow();

    const nameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.MESSAGE,
      placeholder: 'Введите название чата',
      name: 'name',
      type: 'text',
      className: 'sidebar__creating-chat-input',
    });

    const createButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: 'Создать',
      className: 'sidebar__creating-chat-button',
      onClick: this.createChat.bind(this),
    });

    return {
      profileButton,
      chatList,
      chatWindow,
      nameInput,
      createButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chats-container',
    };
  }

  public createChat() {
    const { nameInput } = this.children;

    (nameInput as ValidatedInput).validate();

    if (nameInput.state.isValid) {
      chatsController.create(nameInput.value).then(() => {
        (this.children.nameInput as ValidatedInput).resetValue();
      });
    }
  }

  public render(): DocumentFragment {
    return this.compile(chatsTemplate, { activeChatId: this.props.activeChatId });
  }
}

const mapStateToProps = (state: IRootState) => ({
  activeChatId: state.activeChatId,
});

export default connect(mapStateToProps)(Chats);

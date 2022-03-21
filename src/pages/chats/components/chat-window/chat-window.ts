import ValidatedInput from '@components/validated-input/validated-input';
import chatsController from '@controllers/chats-controller';
import Block from '@utils/block/block';
import connect from '@utils/connect';
import { IRootState } from '@utils/store';
import { VALIDATION_NAMES } from '@utils/validation';
import { IChatModel, IFullMessageModel, IFullUserModel } from '../../../../types';
import ChatSendButton from '../chat-send-button/chat-send-button';
import ChatUsersModal from '../chat-users-modal/chat-users-modal';
import ContextMenu from '../context-menu/context-menu';
import chatWindowTemplate from './chat-window.template';
import './chat-window.css';

interface IChatWindowProps {
  chatModel: IChatModel | undefined;
  chatUserList: IFullUserModel[];
  messagesHistory: IFullMessageModel[];
}

class ChatWindow extends Block<IChatWindowProps> {
  constructor(props: IChatWindowProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block> {
    const contextMenu = new ContextMenu({
      onAddUser: this.toggleAddUserModalVisibility.bind(this),
      onRemoveUser: this.toggleRemoveUserModalVisibility.bind(this),
      onRemoveChat: this.removeChat.bind(this),
    });

    const messageInput = new ValidatedInput({
      className: 'chat-window__message-input',
      isValid: false,
      validationName: VALIDATION_NAMES.MESSAGE,
      placeholder: 'Сообщение',
      name: 'message',
      type: 'text',
      withoutValidationMessage: true,
    });

    const sendButton = new ChatSendButton({
      events: {
        click: (event) => {
          event.preventDefault();
          messageInput.validate();

          if (messageInput.state.isValid) {
            chatsController.sendMessage(messageInput.value);
            messageInput.resetValue();
          }
        },
      },
    });

    const addUserModal = new ChatUsersModal({
      headerText: 'Добавить пользователя',
      buttonText: 'Добавить',
      onButtonClick: this.addUserInChat.bind(this),
      onClose: this.closeModals.bind(this),
    });

    const removeUserModal = new ChatUsersModal({
      headerText: 'Удалить пользователя',
      buttonText: 'Удалить',
      onButtonClick: this.removeUserInChat.bind(this),
      onClose: this.closeModals.bind(this),
    });

    return {
      addUserModal,
      removeUserModal,
      contextMenu,
      messageInput,
      sendButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat-window',
    };
  }

  public toggleAddUserModalVisibility() {
    this.setState({ isAddUserModalVisible: !this.state.isAddUserModalVisible });
  }

  public toggleRemoveUserModalVisibility() {
    this.setState({ isRemoveUserModalVisible: !this.state.isRemoveUserModalVisible });
  }

  public closeModals() {
    this.setState({
      isAddUserModalVisible: false,
      isRemoveUserModalVisible: false,
    });
  }

  public addUserInChat(login: string) {
    chatsController
      .addToChat(login, (this.props.chatModel as IChatModel).id)
      .then(this.toggleAddUserModalVisibility.bind(this));
  }

  public removeUserInChat(login: string) {
    chatsController
      .removeFromChat(login, (this.props.chatModel as IChatModel).id)
      .then(this.toggleRemoveUserModalVisibility.bind(this));
  }

  public removeChat() {
    chatsController.remove((this.props.chatModel as IChatModel).id);
  }

  public render(): DocumentFragment {
    const { chatModel, chatUserList } = this.props;
    const userNameList = chatUserList.map((currentUser) => {
      if (currentUser.display_name) {
        return currentUser.display_name;
      }

      return `${currentUser.first_name} ${currentUser.second_name}`;
    });

    return this.compile(chatWindowTemplate, {
      title: chatModel ? `${chatModel.title} (${userNameList.join(', ')})` : '',
      avatarUrl: chatModel?.avatar ? `https://ya-praktikum.tech/api/v2/resources/${chatModel.avatar}` : '',
      isAddUserModalVisible: this.state.isAddUserModalVisible,
      isRemoveUserModalVisible: this.state.isRemoveUserModalVisible,
      messageList: this.props.messagesHistory,
    });
  }
}

const mapStateToProps = (state: IRootState) => ({
  chatModel: state.chats.find((chat) => chat.id === state.activeChatId),
  chatUserList: state.currentChatUserList,
  messagesHistory: state.messagesHistory,
});

export default connect(mapStateToProps)(ChatWindow);

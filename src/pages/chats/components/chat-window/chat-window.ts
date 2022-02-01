import ValidatedInput from '~src/components/validated-input/validated-input';
import Block from '~src/utils/block';
import { VALIDATION_NAMES } from '~src/utils/validation';
import ChatSendButton from '../chat-send-button/chat-send-button';
import chatWindowTemplate from './chat-window.template';

export default class ChatWindow extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block<{}>> {
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

          // eslint-disable-next-line no-console
          console.log('CHAT_FORM DATA', {
            message: messageInput.value,
          });
        },
      },
    });

    return {
      messageInput,
      sendButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat-window',
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatWindowTemplate);
  }
}

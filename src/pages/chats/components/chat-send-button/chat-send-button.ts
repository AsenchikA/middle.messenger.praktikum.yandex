import Block from '~src/utils/block';
import chatSendButtonTemplate from './chat-send-button.template';

interface IChatSendButtonProps {
  events: Record<string, (e: Event) => void>;
}

export default class ChatSendButton extends Block<IChatSendButtonProps> {
  constructor(props: IChatSendButtonProps) {
    super('button', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat-send-button',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events;
  }

  public render(): DocumentFragment {
    return this.compile(chatSendButtonTemplate);
  }
}

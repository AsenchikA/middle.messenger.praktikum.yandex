import Block from '~src/utils/block';
import template from './chat-card.template';

interface IChatCardProps {
  name: string;
  message: string;
  events?: Record<string, (e: Event) => void>;
}

export default class ChatCard extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat-card',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events || {};
  }

  public render(): DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      message: this.props.message,
    });
  }
}

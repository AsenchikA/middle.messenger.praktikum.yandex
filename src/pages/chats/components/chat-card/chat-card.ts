import Block from '@utils/block/block';
import template from './chat-card.template';
import './chat-card.css';

interface IChatCardProps {
  name: string;
  message: string;
  onClick: (event: Event) => void;
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
    return {
      click: this.props.onClick,
    };
  }

  public render(): DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      message: this.props.message,
    });
  }
}

import Block from "~src/utils/block";
import template from './chat-card.template';

interface IChatCardProps {
  name: string;
  message: string;
}

export default class ChatCard extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
      return {
        class: 'chat-card',
      }
  }

  public render(): DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      message: this.props.message,
    });
  }
}
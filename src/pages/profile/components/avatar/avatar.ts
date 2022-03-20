import Block from '@utils/block/block';
import avatarTemplate from './avatar.template';
import './avatar.css';

interface IAvatarProps {
  url: string;
  onClick: (event: Event) => void;
  className?: string;
}

export default class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: `${this.props.className || ''}`,
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return {
      click: this.props.onClick,
    };
  }

  public render(): DocumentFragment {
    return this.compile(avatarTemplate, { url: this.props.url });
  }
}

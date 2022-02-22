import Block from '~src/utils/block';
import contextMenuButtonTemplate from './context-menu-button.template';

interface IContextMenuButtonProps {
  onClick: (event: Event) => void;
}

export default class ContextMenuButton extends Block<IContextMenuButtonProps> {
  constructor(props: IContextMenuButtonProps) {
    super('div', props);
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return {
      click: this.props.onClick,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'context-menu-button',
    };
  }

  public render(): DocumentFragment {
    return this.compile(contextMenuButtonTemplate);
  }
}

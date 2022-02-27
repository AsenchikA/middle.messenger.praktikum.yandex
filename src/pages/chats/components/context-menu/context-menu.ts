import Button, { EButtonAppearance } from '~src/components/button/button';
import Block from '~src/utils/block/block';
import ContextMenuButton from '../context-menu-button/context-menu-button';
import contextMenuTemplate from './context-menu.template';

interface IContextMenuProps {
  onAddUser: () => void;
  onRemoveUser: () => void;
  onRemoveChat: () => void;
}

export default class ContextMenu extends Block<IContextMenuProps> {
  constructor(props: IContextMenuProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block> {
    const menuButton = new ContextMenuButton({
      onClick: this.toggleMenuVisibility.bind(this),
    });

    const addUserButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Добавить пользователя',
      onClick: this.addUser.bind(this),
    });

    const removeUserButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Удалить пользователя',
      onClick: this.removeUser.bind(this),
    });

    const removeChatButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Удалить чат',
      onClick: this.removeChat.bind(this),
    });

    return {
      addUserButton,
      menuButton,
      removeUserButton,
      removeChatButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'context-menu',
    };
  }

  public toggleMenuVisibility() {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  public addUser(event: Event) {
    event.stopPropagation();
    this.toggleMenuVisibility();
    this.props.onAddUser();
  }

  public removeUser(event: Event) {
    event.stopPropagation();
    this.toggleMenuVisibility();
    this.props.onRemoveUser();
  }

  public removeChat(event: Event) {
    event.stopPropagation();
    this.toggleMenuVisibility();
    this.props.onRemoveChat();
  }

  public render(): DocumentFragment {
    return this.compile(contextMenuTemplate, { isMenuVisible: this.state.isMenuVisible });
  }
}

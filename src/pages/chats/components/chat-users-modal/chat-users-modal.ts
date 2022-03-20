import Button, { EButtonAppearance } from '../../../../../src/components/button/button';
import ValidatedInput from '../../../../../src/components/validated-input/validated-input';
import Block from '../../../../../src/utils/block/block';
import { VALIDATION_NAMES } from '../../../../../src/utils/validation';
import chatUsersModalTemplate from './chat-users-modal.template';
import './chat-users-modal.css';

interface IChatUsersModalProps {
  headerText: string;
  buttonText: string;
  onButtonClick: (login: string) => void;
  onClose: () => void;
}

export default class ChatUsersModal extends Block<IChatUsersModalProps> {
  constructor(props: IChatUsersModalProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'overlay',
    };
  }

  protected getChildren(): Record<string, Block<{}>> {
    const loginInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.MESSAGE,
      placeholder: 'Введите логин пользователя',
      name: 'name',
      type: 'text',
      className: 'chat-users-modal__login-input',
    });

    const button = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: this.props.buttonText,
      onClick: this.onAddUser.bind(this),
      className: 'chat-users-modal__button',
    });

    const cancelButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Отмена',
      className: 'chat-users-modal__close-button',
      onClick: this.props.onClose,
    });

    return {
      loginInput,
      button,
      cancelButton,
    };
  }

  public onAddUser() {
    const { loginInput } = this.children;
    (loginInput as ValidatedInput).validate();
    if (loginInput.state.isValid) {
      this.props.onButtonClick(loginInput.value);
    }
  }

  public render(): DocumentFragment {
    return this.compile(chatUsersModalTemplate, { headerText: this.props.headerText });
  }
}

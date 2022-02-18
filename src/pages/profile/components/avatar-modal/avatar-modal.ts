import Button, { EButtonAppearance } from '~src/components/button/button';
import userController from '~src/controllers/user-controller';
import Block from '~src/utils/block';
import avatarModalTemplate from './avatar-modal.template';

interface IAvatarModalProps {
  onClose: () => void;
  onSave: () => void;
}

export default class AvatarModal extends Block<IAvatarModalProps> {
  constructor(props: IAvatarModalProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'overlay',
    };
  }

  protected getChildren(): Record<string, Block<{}>> {
    const saveButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: 'Сохранить',
      className: 'avatar-modal__submit-button',
      onClick: () => {
        const inputElement = this.element?.getElementsByClassName('avatar-modal__input');
        console.log(Array.from(inputElement)[0].files);

        if (inputElement && Array.from(inputElement)[0]?.files.length > 0) {
          const avatarFile = Array.from(inputElement)[0].files[0];

          const form = new FormData();
          form.append('avatar', avatarFile);
          console.log(form, avatarFile, form.getAll('avatar'));
          userController.saveUserAvatar(form).then(this.props.onSave);
        }
      },
    });

    const cancelButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Отмена',
      className: 'avatar-modal__close-button',
      onClick: this.props.onClose,
    });

    return {
      cancelButton,
      saveButton,
    };
  }

  public render(): DocumentFragment {
    return this.compile(avatarModalTemplate);
  }
}

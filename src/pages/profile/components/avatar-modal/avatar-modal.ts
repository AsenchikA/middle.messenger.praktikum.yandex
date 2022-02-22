import Button, { EButtonAppearance } from '~src/components/button/button';
import userController from '~src/controllers/user-controller';
import Block from '~src/utils/block';
import avatarModalTemplate from './avatar-modal.template';
import UploadInput from '../upload-input/upload-input';

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

  protected getChildren(): Record<string, Block> {
    const uploadInput = new UploadInput({
      id: 'uploadAvatarInput',
      onChange: this.changeImage.bind(this),
    });

    const saveButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: 'Сохранить',
      className: 'avatar-modal__submit-button',
      onClick: () => {
        const inputElement = uploadInput.element;

        if (inputElement && inputElement?.files.length > 0) {
          const form = new FormData();
          form.append('avatar', inputElement.files[0]);

          userController.saveUserAvatar(form).then(this.onSave.bind(this));
        }
      },
    });

    const cancelButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Отмена',
      className: 'avatar-modal__close-button',
      onClick: this.onClose.bind(this),
    });

    return {
      cancelButton,
      saveButton,
      uploadInput,
    };
  }

  public changeImage(event: Event) {
    this.setState({ fileName: event?.target?.files[0]?.name });
  }

  public onSave() {
    (this.children.uploadInput as UploadInput).resetValue();
    this.setState({ fileName: '' });
    this.props.onSave();
  }

  public onClose() {
    (this.children.uploadInput as UploadInput).resetValue();
    this.setState({ fileName: '' });
    this.props.onClose();
  }

  public render(): DocumentFragment {
    return this.compile(avatarModalTemplate, { fileName: this.state.fileName });
  }
}

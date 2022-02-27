import BackPanel from '~src/components/back-panel/back-panel';
import Button, { EButtonAppearance } from '~src/components/button/button';
import ValidatedInput from '~src/components/validated-input/validated-input';
import authController from '~src/controllers/auth-controller';
import userController from '~src/controllers/user-controller';
import { IFullUserModel } from '~src/types';
import Block from '~src/utils/block/block';
import connect from '~src/utils/connect';
import router from '~src/utils/router/router';
import { IRootState } from '~src/utils/store';
import { VALIDATION_NAMES } from '~src/utils/validation';
import passwordEditingTemplate from './password-editing.template';

interface IMapStateToProps {
  userModel: IFullUserModel;
}

class PasswordEditing extends Block<IMapStateToProps> {
  constructor(props: IMapStateToProps) {
    super('div', props);

    if (!props.userModel) {
      authController.getUser();
    }
  }

  protected getChildren(): Record<string, Block> {
    const backPanel = new BackPanel({
      onClick: () => {
        router.back();
      },
    });

    const oldPasswordInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.MESSAGE,
      name: 'oldPassword',
      placeholder: 'Введите старый пароль',
      type: 'password',
      className: 'profile-editing__input',
    });
    const newPasswordInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.MESSAGE,
      name: 'newPassword',
      placeholder: 'Введите новый пароль',
      type: 'password',
      className: 'profile-editing__input',
    });
    const duplicateNewPasswordInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.REPEATED_PASSWORD,
      name: 'duplicateNewPassword',
      placeholder: 'Повторите новый пароль',
      type: 'password',
      className: 'profile-editing__input',
    });

    const validatedInputList: ValidatedInput[] = [
      oldPasswordInput,
      newPasswordInput,
    ];

    const submitButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      className: 'profile-editing__button',
      text: 'Сохранить',
      onClick: () => {
        validatedInputList.forEach((input) => {
          input.validate();
        });

        duplicateNewPasswordInput.validate(newPasswordInput.value);

        const isFormValid = validatedInputList.every((input) => input.state.isValid) && duplicateNewPasswordInput.state.isValid;

        if (isFormValid) {
          userController.changePassword(oldPasswordInput.value, newPasswordInput.value);
        }
      },
    });

    return {
      backPanel,
      oldPasswordInput,
      newPasswordInput,
      duplicateNewPasswordInput,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'profile-container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(passwordEditingTemplate, {
      avatarUrl: this.props.userModel ? `https://ya-praktikum.tech/api/v2/resources/${this.props.userModel.avatar}` : '',
      userName: this.props.userModel?.display_name || '',
    });
  }
}

function mapStateToProps(state: IRootState) {
  return {
    userModel: state.user,
  };
}

export default connect(mapStateToProps)(PasswordEditing);

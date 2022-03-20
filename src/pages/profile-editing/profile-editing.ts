import BackPanel from '../../../src/components/back-panel/back-panel';
import Button, { EButtonAppearance } from '../../../src/components/button/button';
import ValidatedInput from '../../../src/components/validated-input/validated-input';
import authController from '../../../src/controllers/auth-controller';
import userController from '../../../src/controllers/user-controller';
import { IFullUserModel } from '../../../src/types';
import Block from '../../../src/utils/block/block';
import connect from '../../../src/utils/connect';
import isEqual from '../../../src/utils/is-equal';
import router from '../../../src/utils/router/router';
import { IRootState } from '../../../src/utils/store';
import { VALIDATION_NAMES } from '../../../src/utils/validation';
import profileEditingTemplate from './profile-editing.template';
import './profile-editing.css';

interface IMapStateToProps {
  userModel: IFullUserModel;
}

class ProfileEditing extends Block<IMapStateToProps> {
  constructor(props: IMapStateToProps) {
    super('div', props);

    if (!props.userModel) {
      authController.getUser();
    }
  }

  public componentDidUpdate(oldProps: IMapStateToProps, newProps: IMapStateToProps): boolean {
    const isEqualProps = isEqual(oldProps, newProps);

    if (!isEqualProps) {
      this.children.emailInput.setProps({ defaultValue: newProps.userModel?.email });
      this.children.loginInput.setProps({ defaultValue: newProps.userModel?.login });
      this.children.firstNameInput.setProps({ defaultValue: newProps.userModel?.first_name });
      this.children.secondNameInput.setProps({ defaultValue: newProps.userModel?.second_name });
      this.children.chatNameInput.setProps({ defaultValue: newProps.userModel?.display_name });
      this.children.phoneInput.setProps({ defaultValue: newProps.userModel?.phone });
    }

    return !isEqualProps;
  }

  protected getChildren(): Record<string, Block> {
    const backPanel = new BackPanel({
      onClick: () => {
        router.back();
      },
    });

    const emailInput = new ValidatedInput({
      defaultValue: this.props.userModel?.email,
      isValid: false,
      validationName: VALIDATION_NAMES.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className: 'profile-editing__input',
    });
    const loginInput = new ValidatedInput({
      defaultValue: this.props.userModel?.login,
      isValid: false,
      validationName: VALIDATION_NAMES.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'profile-editing__input',
    });
    const firstNameInput = new ValidatedInput({
      defaultValue: this.props.userModel?.first_name,
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const secondNameInput = new ValidatedInput({
      defaultValue: this.props.userModel?.second_name,
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const chatNameInput = new ValidatedInput({
      defaultValue: this.props.userModel?.display_name,
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'chat_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const phoneInput = new ValidatedInput({
      defaultValue: this.props.userModel?.phone,
      isValid: false,
      validationName: VALIDATION_NAMES.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'text',
      className: 'profile-editing__input',
    });

    const validatedInputList: ValidatedInput[] = [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      chatNameInput,
      phoneInput,
    ];

    const submitButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      className: 'profile-editing__button',
      text: 'Сохранить',
      onClick: () => {
        validatedInputList.forEach((input) => {
          input.validate();
        });

        const isFormValid = validatedInputList.every((input) => input.state.isValid);

        if (isFormValid) {
          userController.saveUserProfile({
            email: emailInput.value,
            login: loginInput.value,
            first_name: firstNameInput.value,
            second_name: secondNameInput.value,
            display_name: chatNameInput.value,
            phone: phoneInput.value,
          });
        }
      },
    });

    return {
      backPanel,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      chatNameInput,
      phoneInput,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'profile-container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(profileEditingTemplate, {
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

export default connect(mapStateToProps)(ProfileEditing);

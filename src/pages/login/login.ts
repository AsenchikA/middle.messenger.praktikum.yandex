import Block from '../../../src/utils/block/block';
import Input from '../../../src/components/input/Input';
import loginTemplate from './login.template';
import ValidatedInput from '../../../src/components/validated-input/validated-input';
import Button, { EButtonAppearance } from '../../../src/components/button/button';
import { VALIDATION_NAMES } from '../../../src/utils/validation';
import authController from '../../../src/controllers/auth-controller';
import { ILoginUserModel } from '../../../src/types';
import './login.css';

interface ILoginProps {
  loginField: Input;
  passwordField: Input;
}

export default class Login extends Block<ILoginProps> {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const loginField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'login-form__input',
    });

    const passwordField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PASSWORD,
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className: 'login-form__input',
    });

    const submitButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: 'Войти',
      className: 'login-form__main-button',
      onClick: () => {
        loginField.validate();
        passwordField.validate();

        const isFormValid = loginField.state.isValid && passwordField.state.isValid;

        if (isFormValid) {
          const loginModel: ILoginUserModel = {
            login: loginField.value,
            password: passwordField.value,
          };

          authController.signIn(loginModel);
        }
      },
    });

    return {
      loginField,
      passwordField,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'login-form',
    };
  }

  public render(): DocumentFragment {
    return this.compile(loginTemplate);
  }
}

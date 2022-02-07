import Block from '~src/utils/block';
import './login.css';
import Input from '~src/components/input/Input';
import loginTemplate from './login.template';
import ValidatedInput from '~src/components/validated-input/validated-input';
import SubmitButton from '~src/components/submit-button/submit-button';
import { VALIDATION_NAMES } from '~src/utils/validation';

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

    const submitButton = new SubmitButton({
      text: 'Войти',
      className: 'login-form__main-button',
      events: {
        click: (event) => {
          event.preventDefault();
          loginField.validate();
          passwordField.validate();

          // eslint-disable-next-line no-console
          console.log('LOGIN_FORM DATA', {
            login: loginField.value,
            password: passwordField.value,
          });
        },
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

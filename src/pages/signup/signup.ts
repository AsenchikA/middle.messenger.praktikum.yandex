import SubmitButton from '~src/components/submit-button/submit-button';
import ValidatedInput from '~src/components/validated-input/validated-input';
import Block from '~src/utils/block';
import { VALIDATION_NAMES } from '~src/utils/validation';
import signupTemplate from './signup.template';

export default class Signup extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const emailInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className: 'signup-form__input',
    });
    const loginInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'signup-form__input',
    });
    const firstNameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className: 'signup-form__input',
    });
    const secondNameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className: 'signup-form__input',
    });
    const phoneInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'text',
      className: 'signup-form__input',
    });
    const passwordInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PASSWORD,
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className: 'signup-form__input',
    });
    const secondPasswordInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.REPEATED_PASSWORD,
      placeholder: 'Пароль (ещё раз)',
      name: 'password',
      type: 'password',
      className: 'signup-form__input',
    });

    const validatedInputList: ValidatedInput[] = [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
    ];

    const submitButton = new SubmitButton({
      text: 'Зарегистрироваться',
      className: 'signup-form__main-button',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((child) => {
            child.validate();
          });

          secondPasswordInput.validate(passwordInput.value);

          // eslint-disable-next-line no-console
          console.log('REGISTRATION_FORM DATA', {
            email: emailInput.value,
            login: loginInput.value,
            firstName: firstNameInput.value,
            secondName: secondNameInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
          });
        },
      },
    });

    return {
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      secondPasswordInput,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'signup-form',
    };
  }

  public render(): DocumentFragment {
    return this.compile(signupTemplate);
  }
}

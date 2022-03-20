import Button, { EButtonAppearance } from '@components/button/button';
import ValidatedInput from '@components/validated-input/validated-input';
import authController from '@controllers/auth-controller';
import Block from '@utils/block/block';
import { VALIDATION_NAMES } from '@utils/validation';
import { ISignUpUserModel } from '../../types';
import signupTemplate from './signup.template';
import './signup.css';

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

    const submitButton = new Button({
      appearance: EButtonAppearance.SUBMIT,
      text: 'Зарегистрироваться',
      className: 'signup-form__main-button',
      onClick: () => {
        validatedInputList.forEach((child) => {
          child.validate();
        });

        secondPasswordInput.validate(passwordInput.value);

        const isFormValid = validatedInputList.every((input) => input.state.isValid) && secondPasswordInput.state.isValid;

        if (isFormValid) {
          const model: ISignUpUserModel = {
            email: emailInput.value,
            login: loginInput.value,
            first_name: firstNameInput.value,
            second_name: secondNameInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
          };
          authController.signUp(model);
        }
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

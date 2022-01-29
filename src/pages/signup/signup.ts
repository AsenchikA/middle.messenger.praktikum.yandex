import Input from "~src/components/input/Input";
import Block from "~src/utils/block";
import signupTemplate from "./signup.template";

export default class Signup extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const emailInput = new Input({
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className:'signup-form__input',
    });
    const loginInput = new Input({
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className:'signup-form__input',
    });
    const firstNameInput = new Input({
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className:'signup-form__input',
    });
    const secondNameInput = new Input({
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className:'signup-form__input',
    });
    const phoneInput = new Input({
      placeholder: 'Телефон',
      name: 'phone',
      type: 'text',
      className:'signup-form__input',
    });
    const passwordInput = new Input({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className:'signup-form__input',
    });
    const secondPasswordInput = new Input({
      placeholder: 'Пароль (ещё раз)',
      name: 'password',
      type: 'password',
      className:'signup-form__input',
    });

    return {
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      secondPasswordInput,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'signup-form',
    }
  }

  public render(): DocumentFragment {
    return this.compile(signupTemplate);
  }
}
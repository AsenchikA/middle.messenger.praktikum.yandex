import Block from "~src/utils/block";
import './login.css';
import Input from "~src/components/input/Input";
import loginTemplate from "./login.template";

export default class Login extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const loginField = new Input({
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'login-form__input',
      events: {}
    });

    const passwordField = new Input({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className: 'login-form__input',
      events: {}
    });

    return {
      loginField,
      passwordField,
    }
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
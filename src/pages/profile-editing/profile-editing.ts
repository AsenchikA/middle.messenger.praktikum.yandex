import SubmitButton from '~src/components/submit-button/submit-button';
import ValidatedInput from '~src/components/validated-input/validated-input';
import Block from '~src/utils/block';
import { VALIDATION_NAMES } from '~src/utils/validation';
import profileEditingTemplate from './profile-editing.template';

export default class ProfileEditing extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block> {
    const emailInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className: 'profile-editing__input',
    });
    const loginInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'profile-editing__input',
    });
    const firstNameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const secondNameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const chatNameInput = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'chat_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const phoneInput = new ValidatedInput({
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

    const submitButton = new SubmitButton({
      className: 'profile-editing__button',
      text: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((input) => {
            input.validate();
          });

          // eslint-disable-next-line no-console
          console.log('PROFILE_FORM DATA', {
            email: emailInput.value,
            login: loginInput.value,
            firstName: firstNameInput.value,
            secondName: secondNameInput.value,
            chatName: chatNameInput.value,
            phone: phoneInput.value,
          });
        },
      },
    });

    return {
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
    return this.compile(profileEditingTemplate);
  }
}

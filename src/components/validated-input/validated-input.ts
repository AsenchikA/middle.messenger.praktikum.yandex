import Block from '~src/utils/block';
import { validate, VALIDATION_NAMES } from '~src/utils/validation';
import Input, { IInputProps } from '../input/Input';
import validatedInputTemplate from './validated-input.template';

interface IValidatedInputProps extends IInputProps {
  isValid: boolean;
  validationName: VALIDATION_NAMES;
  validationMessage?: string;
  withoutValidationMessage?: boolean;
}

export default class ValidatedInput extends Block<IValidatedInputProps> {
  constructor(props: IValidatedInputProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block<IInputProps>> {
    const loginField = new Input({
      ...this.props,
      events: {
        blur: this.validate.bind(this),
      },
    });

    return {
      loginField,
    };
  }

  protected getAttributes(): Record<string, string> {
    return ({
      class: 'validated-input',
    });
  }

  public get value(): string {
    return this.children.loginField.value;
  }

  public validate(referenceValue?: string) {
    const { validationName, withoutValidationMessage } = this.props;
    const {
      isValid,
      message,
    } = validate(validationName, this.children.loginField.value, referenceValue);
    this.setProps({
      validationMessage: isValid || withoutValidationMessage ? '' : message,
    });
  }

  public render(): DocumentFragment {
    return this.compile(validatedInputTemplate, {
      loginValidationMessage: this.props.validationMessage || '',
    });
  }
}

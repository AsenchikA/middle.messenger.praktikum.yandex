import Block from '~src/utils/block';
import isEqual from '~src/utils/is-equal';
import { validate, VALIDATION_NAMES } from '~src/utils/validation';
import Input, { IInputProps } from '../input/Input';
import validatedInputTemplate from './validated-input.template';

interface IValidatedInputProps extends IInputProps {
  isValid: boolean;
  validationName: VALIDATION_NAMES;
  defaultValue?: string;
  validationMessage?: string;
  withoutValidationMessage?: boolean;
}

export default class ValidatedInput extends Block<IValidatedInputProps> {
  constructor(props: IValidatedInputProps) {
    super('div', props);
  }

  public componentDidUpdate(oldProps: IValidatedInputProps, newProps: IValidatedInputProps): boolean {
    const isEqualProps = isEqual(oldProps, newProps);

    if (!isEqualProps) {
      this.children.input.setProps({ defaultValue: newProps.defaultValue });
    }

    return !isEqualProps;
  }

  protected getChildren(): Record<string, Block<IInputProps>> {
    const input = new Input({
      ...this.props,
      events: {
        blur: this.validate.bind(this),
      },
    });

    return {
      input,
    };
  }

  protected getAttributes(): Record<string, string> {
    return ({
      class: 'validated-input',
    });
  }

  public get value(): string {
    return this.children.input.value;
  }

  public validate(referenceValue?: string) {
    const { validationName, withoutValidationMessage } = this.props;
    const {
      isValid,
      message,
    } = validate(validationName, this.children.input.value, referenceValue);

    this.setState({ isValid });
    this.setProps({
      validationMessage: isValid || withoutValidationMessage ? '' : message,
    });
  }

  public resetValue() {
    const inputElement = (this.children.input as Input).getContent();

    if (inputElement) {
      inputElement.value = '';
    }
  }

  public render(): DocumentFragment {
    return this.compile(validatedInputTemplate, {
      loginValidationMessage: this.props.validationMessage || '',
    });
  }
}

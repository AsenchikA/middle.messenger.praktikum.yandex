import Block from '../../utils/block';
import template from './input.template';

export interface IInputProps {
  defaultValue?: string;
  placeholder: string;
  name: string;
  type: string;
  className?: string;
  events?: Record<string, (e: Event) => void>;
}

export default class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super('input', props);
  }

  protected getAttributes() {
    return {
      class: `input ${this.props.className || ''}`,
      value: this.props.defaultValue || '',
      placeholder: this.props.placeholder,
      inputName: this.props.name,
      type: this.props.type,
    };
  }

  public get value(): string {
    return (this.element as HTMLInputElement)?.value;
  }

  protected getEvents() {
    return this.props.events || {};
  }

  render() {
    return this.compile(template);
  }
}

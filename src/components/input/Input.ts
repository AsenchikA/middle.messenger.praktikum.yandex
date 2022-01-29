import Block from "../../utils/block";
import template from './input.template';

interface IInput {
  className?: string;
  placeholder: string;
  name: string;
  type: string;
  events?: Record<string, () => void>;
}

export default class Input extends Block<IInput> {
  constructor(props: IInput) {
    super('input', props);
  }

  protected getAttributes() {
    return {
      class: `input ${this.props.className || ''}`,
      placeholder: this.props.placeholder,
      inputName: this.props.name,
      type: this.props.type,
    }
  }

  protected getEvents() {
    return this.props.events ? this.props.events : {};
  };

  render() {
    return this.compile(template, {});
  }
}
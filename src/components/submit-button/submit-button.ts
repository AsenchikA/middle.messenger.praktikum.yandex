import Block from '~src/utils/block';
import submitButtonTemplate from './submit-button.template';

interface ISubmitButtonProps {
  className?: string;
  text: string;
  events?: Record<string, (e: Event) => void>;
}

export default class SubmitButton extends Block<ISubmitButtonProps> {
  constructor(props: ISubmitButtonProps) {
    super('button', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: `submit-button ${this.props.className || ''}`,
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render(): DocumentFragment {
    return this.compile(submitButtonTemplate, { text: this.props.text });
  }
}

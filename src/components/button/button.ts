import Block from '~src/utils/block';
import buttonTemplate from './button.template';

export enum EButtonAppearance {
  SUBMIT,
  TEXT,
}

interface IButtonProps {
  appearance: EButtonAppearance;
  text: string;
  className?: string;
  onClick: (event: Event) => void;
}

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super('button', props);
  }

  public getAppearanceClassName() {
    switch (this.props.appearance) {
      case EButtonAppearance.SUBMIT:
        return 'button--submit';
      case EButtonAppearance.TEXT:
        return 'button--text';
      default:
        return '';
    }
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: `button ${this.getAppearanceClassName()} ${this.props.className || ''}`,
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return {
      click: (event) => {
        event.preventDefault();
        this.props.onClick(event);
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(buttonTemplate, { text: this.props.text });
  }
}

import Block from '../../../src/utils/block/block';
import backPanelTemplate from './back-panel.template';
import './back-panel.css';

interface IBackPanelProps {
  onClick: () => void;
}

export default class BackPanel extends Block<IBackPanelProps> {
  constructor(props: IBackPanelProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'back-panel',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return {
      click: this.props.onClick,
    };
  }

  public render(): DocumentFragment {
    return this.compile(backPanelTemplate);
  }
}

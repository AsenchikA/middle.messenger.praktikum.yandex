import Block from '~src/utils/block';
import notificationTemplate from './notification.template';

interface INotificationProps {
  text: string;
}

export default class Notification extends Block<INotificationProps> {
  constructor(props: INotificationProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'notification',
    };
  }

  public render(): DocumentFragment {
    return this.compile(notificationTemplate, { text: this.props.text });
  }
}

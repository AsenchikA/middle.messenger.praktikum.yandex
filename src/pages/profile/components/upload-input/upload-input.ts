import Block from '@utils/block/block';
import uploadInputTemplate from './upload-input.template';
import './upload-input.css';

interface IUploadInputProps {
  id: string;
  onChange: (event: Event) => void;
}

export default class UploadInput extends Block<IUploadInputProps> {
  constructor(props: IUploadInputProps) {
    super('input', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      id: this.props.id,
      type: 'file',
      accept: 'image/*',
      class: 'upload-input',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return {
      change: this.props.onChange,
    };
  }

  public resetValue() {
    if (this.element) {
      (this.element as HTMLInputElement).value = '';
    }
  }

  public render(): DocumentFragment {
    return this.compile(uploadInputTemplate);
  }
}

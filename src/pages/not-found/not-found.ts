import ErrorBlock from '../../../src/components/error-block/error-block';
import Block from '../../../src/utils/block/block';
import notFoundTemplate from './not-found.template';
import './not-found.css';

export default class NotFound extends Block {
  constructor() {
    super('main');
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'not-found-container',
    };
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorBlock: new ErrorBlock({
        title: '404',
        subtitle: 'Страница не найдена',
        linkText: 'Назад к чатам',
        linkHref: '/',
      }),
    };
  }

  public render(): DocumentFragment {
    return this.compile(notFoundTemplate);
  }
}

import ErrorBlock from "~src/components/error-block/error-block";
import Block from "~src/utils/block";
import serverErrorTemplate from "./server-error.template";

export default class ServerError extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorBlock: new ErrorBlock({
        title: '500',
        subtitle: 'Мы уже чиним',
        linkText: 'Назад к чатам',
        linkHref: '/',
      }),
    }
  }

  protected getAttributes(): Record<string, string> {
      return {
        class: 'server-error-container',
      };
  }

  public render(): DocumentFragment {
    return this.compile(serverErrorTemplate);
  }
}
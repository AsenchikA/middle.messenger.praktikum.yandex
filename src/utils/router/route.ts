import Block from '../block';
import render from '../render-DOM';

interface BlockConstructor {
  new(): Block;
}

export default class Route {
  private _pathname: string;

  private _blockClass: BlockConstructor;

  private _block: Block | null;

  private _rootQuery: string;

  constructor(pathname: string, view: BlockConstructor, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  public leave() {
    this._block?.hide();
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._rootQuery, this._block as Block);
      return;
    }

    this._block.show();
  }

  public match(pathname: string) {
    return pathname === this._pathname;
  }
}

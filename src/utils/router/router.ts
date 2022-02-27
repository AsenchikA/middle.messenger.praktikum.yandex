import Block from '../block/block';
import Route from './route';

interface BlockConstructor {
  new(): Block;
}

export class Router {
  public static __instance: Router;

  public routes: Route[];

  public history: History;

  private _currentRoute: Route | null;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (!Router.__instance) {
      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;

      Router.__instance = this;
    }

    // eslint-disable-next-line no-constructor-return
    return Router.__instance;
  }

  public use(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, block, this._rootQuery);
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    console.log('_onRoute', pathname);
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    const notFoundRoute = this.getRoute('/not-found');

    const nextRoute = route || notFoundRoute;

    if (nextRoute) {
      this._currentRoute = nextRoute;
      nextRoute.render();
    }
  }

  public go(pathname: string) {
    console.log('go pathname', pathname, this.history, window.history);
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  public setReserveRoute(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, block, this._rootQuery);
    this.routes.push(route);
    return this;
  }
}

const router = new Router('#root');

export default router;

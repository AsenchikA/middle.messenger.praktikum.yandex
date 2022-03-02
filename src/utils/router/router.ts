import Block from '../block/block';
import Route from './route';

interface BlockConstructor {
  new(): Block;
}

export class Router {
  public static __instance: Router;

  public routes: Route[];

  private _currentRoute: Route | null;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (!Router.__instance) {
      this.routes = [];
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
    window.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
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

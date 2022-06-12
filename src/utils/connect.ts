import cloneDeep from './cloneDeep';
import store, { IRootState, STORE_EVENTS } from './store';

// eslint-disable-next-line max-len
function connect<IMapStateToProps extends object, IOwnProps extends object>(mapStateToProps: (state: IRootState) =>IMapStateToProps): (Component: any) => any {
  return (Component: any) => class extends Component<IOwnProps & IMapStateToProps> {
    constructor(props: any) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(STORE_EVENTS.UPDATED, () => {
        this.setProps(cloneDeep(mapStateToProps(store.getState())));
      });
    }
  };
}

export default connect;

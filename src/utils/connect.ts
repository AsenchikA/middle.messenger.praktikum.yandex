import Block from './block/block';
import cloneDeep from './cloneDeep';
import store, { IRootState, STORE_EVENTS } from './store';

function connect<IMapStateToProps>(mapStateToProps: (state: IRootState) => IMapStateToProps) {
  return (Component: typeof Block) => class extends Component {
    constructor(props) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(STORE_EVENTS.UPDATED, () => {
        this.setProps(cloneDeep(mapStateToProps(store.getState())));
      });
    }
  };
}

export default connect;

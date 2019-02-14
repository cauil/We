import { isClass } from './util';
import Reconciler from './Reconciler';
import instantiateComponent from './instantiateComponent'

export default class CompositeComponent {
  constructor(ele) {
    this._currentElement = ele;
    this._publishInstance = null;
    this._renderedComponent = null;
  }

  mount() {
    const ele = this._currentElement;
    const type = ele.type;
    const props = ele.props;
    let instance;
    let renderedEle;

    if (isClass(type)) {
      instance = new type(props);
      renderedEle = instance.render();
    } else {
      instance = null;
      renderedEle = type(props);
    }

    const renderComponent = instantiateComponent(renderedEle);
    this._publishInstance = instance;
    this._renderedComponent = renderComponent;

    return Reconciler.mountComponent(renderComponent);
  }

  unmount() {
    const publishInstance = this._publishInstance;
    if (publishInstance && publishInstance.componentWillUnmount) {
      publishInstance.componentWillUnmount();
    }

    const renderComponent = this._renderedComponent;
    Reconciler.unmountComponent(renderComponent);
  }
}

import { isClass } from './util';
import DOM from './DOM';
import Reconciler from './Reconciler';
import instantiateComponent from './instantiateComponent'

export default class CompositeComponent {
  constructor(ele) {
    this._currentElement = ele;
    this._publishInstance = null;
    this._renderedComponent = null;
  }

  getHostNode() {
    return this._renderedComponent.getHostNode();
  }

  mount() {
    const ele = this._currentElement;
    const type = ele.type;
    const props = ele.props;
    let instance;
    let renderedEle;

    if (isClass(type)) {
      instance = new type(props);
      instance.props = props;
      if (instance.componentWillMount) {
        instance.componentWillMount();
      }
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

  receive(nextEle) {
    const prePorps = this._currentElement.props;
    const publishInstance = this._publishInstance;
    const preRenderComponent = this._renderedComponent;
    const preRenderElement = this._currentElement;

    // update **own** element
    this._currentElement = nextEle;
    const type = nextEle.type;
    const nextProps = nextEle.props;

    // figure out the next render() output
    let nextRenderElement;
    if (isClass(type)) {
      if (publishInstance.componentWillUpdate) {
        publishInstance.componentWillUpdate(nextProps);
      }
      publishInstance.props = nextProps;

      nextRenderElement = publishInstance.render();
    } else if (typeof type === 'function') {
      nextRenderElement = type(nextProps);
    }

    if (preRenderElement.type === nextRenderElement.type) {
      Reconciler.receive(preRenderComponent, nextRenderElement);
      return;
    }

    const preNode = preRenderComponent.getHostNode();

    preRenderComponent.unmount();
    const nextRenderComponent = instantiateComponent(nextRenderElement);
    const nextNode = Reconciler.mountComponent(nextRenderComponent);

    this._renderedComponent = nextRenderComponent;

    DOM.replaceChild(preNode.parentNode, nextNode, preNode);
  }
}

import { isClass } from './util';
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
    console.log('====CompositeComponent', renderComponent)

    this._publishInstance = instance;
    this._renderedComponent = renderComponent;

    return renderComponent.mount();
  }
}

import instantiateComponent from './instantiateComponent'

export default class DOMComponent {
  constructor(ele) {
    this._currentElement = ele;
    this._renderChildren = null;
    this._node = null;
  }

  mount() {
    const ele = this._currentElement;
    const type = ele.type;
    const props = ele.props;
    const node = document.createElement(type);
    let children = props.children || [];

    if (!Array.isArray(children)) {
      children = [children];
    }

    Object.keys(props).forEach(v => {
      if (v !== 'children') {
        node.setAttribute(v, props[v]);
      }
    })

    const renderedChildren = children.filter(v => {
      // v is not object
      return Object.prototype.toString.call(v) === '[Object object]'
    }).map(instantiateComponent);
    console.log('======DOMComponent', renderedChildren)
    this._renderChildren = renderedChildren;

    const childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => node.appendChild(childNode));


    return node;
  }
}

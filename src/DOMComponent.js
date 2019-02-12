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

    const renderChildren = children.map(instantiateComponent);

    renderChildren.forEach(v => {
      node.appendChild(v.mount);
    });

    this._renderChildren = renderChildren;

    return node;
  }
}

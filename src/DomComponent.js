import DOM from './DOM';
import Reconciler from './Reconciler';
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

    // create node and setAttribute
    const node = document.createElement(type);
    this._node = node;
    Object.keys(props).forEach(prop => {
      if (prop === 'style') {
        DOM.updateStyles(node, props[prop])
      } else if (prop !== 'children') {
        DOM.setProperty(node, prop, props[prop]);
      }
    })

    // handle the children node
    this._createInitialDOMChildren(props);

    return node;
  }

  _createInitialDOMChildren(props) {
    // Text content
    let children = props.children;
    if (
      typeof children === 'string' ||
      typeof children === 'number'
    ) {
      // TODO: validate element type can have text children
      // TODO: wrap with helper, there are browser inconsistencies
      this._node.textContent = children;
    } else if (children) {
      // Single element or Array
      if (!Array.isArray(children)) {
        children = [children];
      }

      const renderedChildren = children.map(instantiateComponent);
      this._renderChildren = renderedChildren;

      const childNodes = renderedChildren.map(child => {
        return child.mount()
      });

      DOM.appendChildren(this._node, childNodes);
    }
  }

  unmount() {
    const renderChildren = this._renderChildren;

    if(renderChildren) {
      renderChildren.forEach(child => {
        Reconciler.unmountComponent(child);
      });
    }
  }
}

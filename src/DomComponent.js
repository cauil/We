import DOM from './DOM';
import Reconciler from './Reconciler';
import shouldUpdateComponent from './shouldUpdateComponent';
import instantiateComponent from './instantiateComponent';

export default class DOMComponent {
  constructor(ele) {
    this._currentElement = ele;
    this._renderChildren = null;
    this._node = null;
  }

  getHostNode() {
    return this._node;
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

  receive(nextElement) {
    var node = this._node;
    var prevElement = this._currentElement;
    var prevProps = prevElement.props;
    var nextProps = nextElement.props;
    this._currentElement = nextElement;

    // Remove old attributes. TODO style
    Object.keys(prevProps).forEach(propName => {
      if (propName !== 'children' && !nextProps.hasOwnProperty(propName)) {
        node.removeAttribute(propName);
      }
    });
    // Set next attributes.
    Object.keys(nextProps).forEach(propName => {
      if (propName !== 'children') {
        TODO.setProperty(node, propName, nextProps[propName]);
      }
    });

    // These are arrays of React elements:
    var prevChildren = prevProps.children || [];
    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }
    var nextChildren = nextProps.children || [];
    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }
    // These are arrays of internal instances:
    var prevRenderedChildren = this._renderedChildren;
    var nextRenderedChildren = [];

    // As we iterate over children, we will add operations to the array.
    var operationQueue = [];

    // Note: the section below is extremely simplified!
    // It doesn't handle reorders, children with holes, or keys.
    // It only exists to illustrate the overall flow, not the specifics.

    for (var i = 0; i < nextChildren.length; i++) {
      // Try to get an existing internal instance for this child
      var prevChild = prevRenderedChildren[i];

      // If there is no internal instance under this index,
      // a child has been appended to the end. Create a new
      // internal instance, mount it, and use its node.
      if (!prevChild) {
        var nextChild = instantiateComponent(nextChildren[i]);
        var node = Reconciler.mountComponent(nextChild);

        // Record that we need to append a node
        operationQueue.push({type: 'ADD', node});
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // We can only update the instance if its element's type matches.
      // For example, <Button size="small" /> can be updated to
      // <Button size="large" /> but not to an <App />.
      var canUpdate = shouldUpdateComponent(prevChildren[i], nextChildren[i]);

      // If we can't update an existing instance, we have to unmount it
      // and mount a new one instead of it.
      if (!canUpdate) {
        var prevNode = prevChild.getHostNode();
        prevChild.unmount();

        var nextChild = instantiateComponent(nextChildren[i]);
        var nextNode = nextChild.mount();

        // Record that we need to swap the nodes
        operationQueue.push({type: 'REPLACE', prevNode, nextNode});
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // If we can update an existing internal instance,
      // just let it receive the next element and handle its own update.
      Reconciler.receiveComponent(prevChild, nextChildren[i]);
      nextRenderedChildren.push(prevChild);
    }

    // Finally, unmount any children that don't exist:
    for (var j = nextChildren.length; j < prevChildren.length; j++) {
      var prevChild = prevRenderedChildren[j];
      var node = prevChild.getHostNode();
      Reconciler.unmountComponent(prevChild);

      // Record that we need to remove the node
      operationQueue.push({type: 'REMOVE', node});
    }

    // Point the list of rendered children to the updated version.
    this._renderedChildren = nextRenderedChildren;

    while (operationQueue.length > 0) {
      var operation = operationQueue.shift();
      switch (operation.type) {
      case 'ADD':
        this._node.appendChild(operation.node);
        break;
      case 'REPLACE':
        this._node.replaceChild(operation.nextNode, operation.prevNode);
        break;
      case 'REMOVE':
        this._node.removeChild(operation.node);
        break;
      }
    }
  }
}

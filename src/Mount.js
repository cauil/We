import assert from './assert';
import DOM from './DOM';
import Element from './Element';
import Reconciler from './Reconciler';
import instantiateComponent from './instantiateComponent';

const ROOT_KEY = 'dlthmRootId';
let rootID = 1;
// Used to track root instances.
const instancesByRootID = {};

function isRoot(node) {
  if (node.dataset[ROOT_KEY]) {
    return true;
  }

  return false;
}

function render(ele, node) {
  assert(Element.isValidElement(ele));

  if (isRoot(node)) {
    update(ele, node);
  } else {
    mountTree(ele, node);
  }
}

function mountTree(ele, node) {
  // mark the mounted root node
  node.dataset[ROOT_KEY] = rootID;

  const component = instantiateComponent(ele);
  instancesByRootID[rootID] = component;

  // This will return a DOM node. React does more work here to determine if we're remounting
  // server-rendered content.
  const renderedNode = Reconciler.mountComponent(component, node);

  DOM.empty(node);
  DOM.appendChild(node, renderedNode);
  rootID++;
}

function update(ele, node) {
  // Ensure we have a valid root node
  assert(node && isRoot(node));

  // Find the internal instance and update it
  let id = node.dataset[ROOT_KEY];

  let instance = instancesByRootID[id];

  if (shouldUpdateComponent(instance, ele)) {
    // TODO: do the update
  } else {
    // Unmount and then mount the new one
    unmountComponentAtNode(node);
    mountTree(ele, node);
  }
}

function unmountComponentAtNode(node) {
  assert(node && isRoot(node));

  let id = node.dataset[ROOT_KEY];

  // In React we would do a batch unmount operation. This would in turn call
  // componentWillUnmount for each instance. We aren't going to support that,
  // so we can just delete the top level instance and let everything get garbage
  // collected.
  let instance = instancesByRootID[id];
  Reconciler.unmountComponent(instance);

  delete instancesByRootID[id];

  // Reset the DOM node
  DOM.empty(node);
  delete node.dataset[ROOT_KEY];
}

export {
  render,
  unmountComponentAtNode
}

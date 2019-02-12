import instantiateComponent from './instantiateComponent';

export function mountTree(ele, node) {
  const component = instantiateComponent(ele);
  const renderedNode = component.mount();

  node.appendChild(renderedNode);
}

export function unmountTree(ele, node) {
}

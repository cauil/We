// React does more work here to ensure that refs work. We don't need to
function mountComponent(component) {
  return component.mount();
}

// Again, React will do more work here to detach refs. We won't.
function unmountComponent(component, node) {
  component.unmount();
}

function receiveComponent(component, nextEle) {
  const preEle = component._currentElement;

  if(preEle === nextEle) {
    return;
  }

  component.receive(nextEle);
}

function performUpdateIfNecessary(component) {
  component.performUpdateIfNecessary();
}

export default {
  mountComponent,
  receiveComponent,
  unmountComponent,
  performUpdateIfNecessary,
};

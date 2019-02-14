import assert from './assert';
import Element from './Element';
import CompositeComponent from './CompositeComponent';
import HostComponent from './HostComponent';


export default function instantiateComponent(ele) {
  assert(Element.isValidElement(ele));

  const type = ele.type;
  let internalComponent;

  if (typeof type === 'string') {
    internalComponent = HostComponent._construct(ele)
  } else if (typeof type === 'function') {
    internalComponent =  new CompositeComponent(ele);
  } else if (typeof ele === 'string' || typeof ele === 'number') {
    internalComponent = HostComponent.constructTextComponent(ele);
  }

  return internalComponent
}


'use strict';

import assert from './assert';
import Element from './Element';
import CompositeComponent from './CompositeComponent';
import HostComponent from './HostComponent';

export default function instantiateComponent(ele) {
  assert(Element.isValidElement(element));

  const type = ele.type;
  let internalComponent;

  if (typeof type === 'string') {
    internalComponent = HostComponent.constructor(ele)
  } else if (typeof type === 'function') {
    internalComponent =  new CompositeComponent(ele);
  } else if (typeof element === 'string' || typeof element === 'number') {
    internalComponent = HostComponent.constructTextComponent(ele);
  }

  return internalComponent
}


import Element from './Element';
import Component from './Component';
import { mountTree, unmountComponentAtNode } from './Mount';
import HostComponent from './HostComponent';
import DomComponent from './DomComponent';

HostComponent.inject(DomComponent);

return {
  Component,
  createElement: Element.createElement,
  render: mountTree,
  unmount: unmountComponentAtNode,
};

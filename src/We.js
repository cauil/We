import Element from './Element';
import Component from './Component';
import { render, unmountComponentAtNode } from './Mount';
import HostComponent from './HostComponent';
import DomComponent from './DomComponent';

HostComponent.inject(DomComponent);

export default {
  Component,
  render,
  createElement: Element.createElement,
  unmount: unmountComponentAtNode,
};

import assert from './assert';

let implementation;

function _construct(element) {
  assert(implementation);

  return new implementation(element);
}

function constructTextComponent(element) {
  // Create wrapper element. It will just be a span.
  return _construct({
    type: 'span',
    props: {
      children: element,
    },
  });
}

function inject(impl) {
  implementation = impl;
}

export default {
  inject,
  _construct,
  constructTextComponent,
}

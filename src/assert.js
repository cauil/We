'use strict';

export default function assert(condition) {
  if (!condition) {
    throw new Error('assertion failure');
  }
}

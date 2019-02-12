import CompositeComponent from './CompositeComponent';
import DOMComponent from './DOMComponent';

export default function instantiateComponent(ele) {
  const type = ele.type;

  if (typeof type === 'function') {
    return new CompositeComponent(ele);
  } else if (typeof type === 'string') {
    return new DOMComponent(ele);
  }
}


function empty(node) {
  [].slice.call(node.childNodes).forEach(node.removeChild, node);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function appendChildren(node, children) {
  if (Array.isArray(children)) {
    children.forEach(child => appendChild(node, child));
  } else {
    appendChild(node, children);
  }
}

function setProperty(node, key, value) {
  node.setAttribute(key, value);
}

function updateStyles(node, styles) {
  Object.keys(styles).forEach(style => {
    node.style[style] = styles[style];
  })
}

export default {
  empty,
  appendChild,
  appendChildren,
  setProperty,
  updateStyles,
};

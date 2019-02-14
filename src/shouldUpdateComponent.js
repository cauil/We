export default function shouldUpdateComponent(preEle, nextEle) {
  const preType = typeof preEle;
  const nextType = typeof nextEle;

  if (preType === 'string') {
    return nextType === 'string';
  }

  // In react we will also check the key;
  return preEle.type === nextEle.type;
}

type IconNodeEntry = [string, Record<string, string | number>, ...unknown[]];

const pathHasFill = (tag: string, attrs: Record<string, string | number>): boolean =>
  tag === 'path' && Boolean(attrs.fill) && attrs.fill !== 'none';

const nodeUsesFill = (node: IconNodeEntry): boolean => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    if (pathHasFill(tag, attrs)) return true;
    return (children as IconNodeEntry[]).some(nodeUsesFill);
  }
  const [tag, attrs] = node;
  return pathHasFill(tag, attrs);
};

export const iconNodeUsesFill = (iconNode: IconNodeEntry[]): boolean => iconNode.some(nodeUsesFill);

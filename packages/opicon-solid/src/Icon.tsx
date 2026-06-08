import { h, splitProps } from 'solid-js';
import { mergeClasses } from '@opudoc/opicon-shared';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number]): ReturnType<typeof h> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = attrs;
    return h(tag as string, rest, children.map((child) => renderNode(child)));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = attrs;
  return h(tag as string, rest);
};

const Icon = (props: IconComponentProps) => {
  const [local, rest] = splitProps(props, ['iconNode', 'size', 'color', 'strokeWidth', 'absoluteStrokeWidth', 'class']);
  const size = () => local.size ?? 24;
  const strokeWidth = () => {
    const value = local.strokeWidth ?? 2;
    return local.absoluteStrokeWidth ? (Number(value) * 24) / Number(size()) : value;
  };

  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size(),
      height: size(),
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: local.color ?? 'currentColor',
      'stroke-width': strokeWidth(),
      class: mergeClasses('opicon', local.class),
      'aria-hidden': true,
      ...rest,
    },
    () => local.iconNode.map((node) => renderNode(node)),
  );
};

export default Icon;

import { h, splitProps } from 'solid-js';
import { getIconSvgPaintProps, iconNodeElementAttrs, mergeClasses } from '@opudoc/opicon-shared';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number], filled: boolean): ReturnType<typeof h> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
    return h(tag as string, rest, children.map((child) => renderNode(child, filled)));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
  return h(tag as string, rest);
};

const Icon = (props: IconComponentProps) => {
  const [local, rest] = splitProps(props, ['iconNode', 'size', 'color', 'strokeWidth', 'absoluteStrokeWidth', 'class']);
  const size = () => local.size ?? 24;
  const paint = () =>
    getIconSvgPaintProps(local.iconNode, {
      color: local.color,
      strokeWidth: local.strokeWidth,
      absoluteStrokeWidth: local.absoluteStrokeWidth,
      size: size(),
    });

  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size(),
      height: size(),
      viewBox: '0 0 24 24',
      color: paint().color,
      fill: paint().fill,
      stroke: paint().stroke,
      ...(paint().strokeWidth !== undefined && { 'stroke-width': paint().strokeWidth }),
      class: mergeClasses('opicon', local.class),
      'aria-hidden': true,
      ...rest,
    },
    () => local.iconNode.map((node) => renderNode(node, paint().filled)),
  );
};

export default Icon;

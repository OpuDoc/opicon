import { h, type VNode } from 'preact';
import { getIconSvgPaintProps, hasA11yProp, mergeClasses } from '@opudoc/opicon-shared';
import defaultAttributes from './defaultAttributes';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number]): preact.VNode => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = attrs;
    return h(tag, { key, ...rest }, children.map(renderNode));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = attrs;
  return h(tag, { key, ...rest });
};

const Icon = ({ color, size = 24, strokeWidth = 2, absoluteStrokeWidth, className = '', iconNode, children, ...rest }: IconComponentProps): VNode => {
  const paint = getIconSvgPaintProps(iconNode, { color, strokeWidth, absoluteStrokeWidth, size });

  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size,
      height: size,
      color: paint.color,
      fill: paint.fill,
      stroke: paint.stroke,
      ...(paint.strokeWidth !== undefined && { strokeWidth: paint.strokeWidth }),
      className: mergeClasses('opicon', className),
      ...(!children && !hasA11yProp(rest) && { 'aria-hidden': true }),
      ...rest,
    },
    [...iconNode.map(renderNode), children],
  );
};

export default Icon;

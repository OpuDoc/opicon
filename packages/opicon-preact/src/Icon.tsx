import { h, type VNode } from 'preact';
import { getIconSvgPaintProps, hasA11yProp, iconNodeElementAttrs, mergeClasses } from '@opudoc/opicon-shared';
import defaultAttributes from './defaultAttributes';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number], filled: boolean): preact.VNode => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
    return h(tag, { key, ...rest }, children.map((child) => renderNode(child, filled)));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
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
    [...iconNode.map((node) => renderNode(node, paint.filled)), children],
  );
};

export default Icon;

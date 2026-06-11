'use client';

import { createElement, forwardRef } from 'react';
import { getIconSvgPaintProps, hasA11yProp, iconNodeElementAttrs, mergeClasses } from '@opudoc/opicon-shared';
import defaultAttributes from './defaultAttributes';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number], filled: boolean): ReturnType<typeof createElement> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
    return createElement(tag, { key, ...rest }, ...children.map((child) => renderNode(child, filled)));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
  return createElement(tag, { key, ...rest });
};

const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  ({ color, size = 24, strokeWidth = 2, absoluteStrokeWidth, className = '', iconNode, children, ...rest }, ref) => {
    const paint = getIconSvgPaintProps(iconNode, {
      color,
      strokeWidth,
      absoluteStrokeWidth,
      size,
    });

    return createElement(
      'svg',
      {
        ref,
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
  },
);

Icon.displayName = 'OpiconIcon';

export default Icon;

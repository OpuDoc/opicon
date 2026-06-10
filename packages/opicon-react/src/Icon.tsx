'use client';

import { createElement, forwardRef } from 'react';
import { hasA11yProp, iconNodeUsesFill, mergeClasses } from '@opudoc/opicon-shared';
import defaultAttributes from './defaultAttributes';
import type { IconNode, OpiconProps } from './types';

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (node: IconNode[number]): ReturnType<typeof createElement> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = attrs;
    return createElement(tag, { key, ...rest }, ...children.map(renderNode));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = attrs;
  return createElement(tag, { key, ...rest });
};

const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  ({ color, size = 24, strokeWidth = 2, absoluteStrokeWidth, className = '', iconNode, children, ...rest }, ref) => {
    const calculatedStrokeWidth = absoluteStrokeWidth
      ? (Number(strokeWidth) * 24) / Number(size)
      : strokeWidth;
    const iconColor = color ?? 'currentColor';
    const filled = iconNodeUsesFill(iconNode);

    return createElement(
      'svg',
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        color: iconColor,
        fill: filled ? iconColor : 'none',
        stroke: iconColor,
        strokeWidth: calculatedStrokeWidth,
        className: mergeClasses('opicon', className),
        ...(!children && !hasA11yProp(rest) && { 'aria-hidden': true }),
        ...rest,
      },
      [...iconNode.map(renderNode), children],
    );
  },
);

Icon.displayName = 'OpiconIcon';

export default Icon;

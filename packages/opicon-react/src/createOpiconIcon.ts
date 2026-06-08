import { createElement, forwardRef } from 'react';
import { mergeClasses, toKebabCase, toPascalCase } from '@opubase/opicon-shared';
import Icon from './Icon';
import type { IconNode, OpiconIcon } from './types';

const createOpiconIcon = (iconName: string, iconNode: IconNode): OpiconIcon => {
  const Component = forwardRef<SVGSVGElement, React.ComponentProps<typeof Icon>>(({ className, ...props }, ref) =>
    createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`opicon-${toKebabCase(toPascalCase(iconName))}`, `opicon-${iconName}`, className),
      ...props,
    }),
  );

  Component.displayName = toPascalCase(iconName);
  return Component;
};

export default createOpiconIcon;

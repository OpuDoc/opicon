import { h } from 'preact';
import { mergeClasses, toKebabCase, toPascalCase } from '@opubase/opicon-shared';
import Icon from './Icon';
import type { IconNode, OpiconIcon, OpiconProps } from './types';

const createOpiconIcon = (iconName: string, iconNode: IconNode): OpiconIcon => {
  const Component = ({ className, ...props }: OpiconProps) =>
    h(Icon, {
      iconNode,
      className: mergeClasses(`opicon-${toKebabCase(toPascalCase(iconName))}`, `opicon-${iconName}`, className),
      ...props,
    });

  Component.displayName = toPascalCase(iconName);
  return Component;
};

export default createOpiconIcon;

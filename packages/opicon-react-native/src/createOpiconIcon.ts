import { createElement } from 'react';
import { mergeClasses, toKebabCase, toPascalCase } from '@opubase/opicon-shared';
import Icon from './Icon';
import type { IconNode, OpiconIcon, OpiconProps } from './types';

const createOpiconIcon = (iconName: string, iconNode: IconNode): OpiconIcon => {
  const Component = (props: OpiconProps) =>
    createElement(Icon, {
      iconNode,
      ...props,
      className: mergeClasses(`opicon-${toKebabCase(toPascalCase(iconName))}`, `opicon-${iconName}`, props.className),
    });

  Component.displayName = toPascalCase(iconName);
  return Component;
};

export default createOpiconIcon;

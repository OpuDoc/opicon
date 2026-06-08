import createElement from './createElement';
import type { Icons, SVGProps } from './types';

interface ReplaceElementOptions {
  nameAttr: string;
  icons: Icons;
  attrs?: SVGProps;
}

const getIconName = (element: Element, nameAttr: string): string | null => {
  const name = element.getAttribute(nameAttr);
  if (!name) return null;
  return name.replace(/^(opicon|data-opicon)-/, '');
};

const replaceElement = (element: Element, { nameAttr, icons, attrs = {} }: ReplaceElementOptions): void => {
  const iconName = getIconName(element, nameAttr);
  if (!iconName || !icons[iconName]) return;

  const svgElement = createElement(icons[iconName], {
    ...Array.from(element.attributes).reduce<SVGProps>((acc, attr) => {
      if (attr.name !== nameAttr) acc[attr.name] = attr.value;
      return acc;
    }, {}),
    ...attrs,
  });

  element.parentNode?.replaceChild(svgElement, element);
};

export default replaceElement;

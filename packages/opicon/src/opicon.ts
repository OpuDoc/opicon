import replaceElement from './replaceElement';
import { icons as allIcons } from './icons-map';
import type { Icons, SVGProps } from './types';

export interface CreateIconsOptions {
  icons?: Icons;
  nameAttr?: string;
  attrs?: SVGProps;
  root?: Element | Document | DocumentFragment;
}

const createIcons = ({
  icons: iconsMap = {},
  nameAttr = 'data-opicon',
  attrs = {},
  root = typeof document !== 'undefined' ? document : undefined,
}: CreateIconsOptions = {}): void => {
  if (!Object.values(iconsMap).length) {
    throw new Error(
      'Please provide an icons object. Import icons with: import { createIcons, icons } from "@opubase/opicon"; createIcons({ icons });',
    );
  }

  if (!root) {
    throw new Error('createIcons() only works in a browser environment.');
  }

  Array.from(root.querySelectorAll(`[${nameAttr}]`)).forEach((element) =>
    replaceElement(element, { nameAttr, icons: iconsMap, attrs }),
  );
};

export { createIcons, allIcons as icons };
export { default as createElement } from './createElement';
export { default as defaultAttributes } from './defaultAttributes';
export * from './icons';
export * from './types';

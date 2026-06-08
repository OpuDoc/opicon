export const toPascalCase = (str: string): string =>
  str
    .split(/[-_/]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

export const toKebabCase = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const mergeClasses = (...classes: (string | undefined | false)[]): string =>
  classes.filter(Boolean).join(' ');

export const hasA11yProp = (props: Record<string, unknown>): boolean =>
  'aria-label' in props || 'aria-labelledby' in props || 'title' in props;

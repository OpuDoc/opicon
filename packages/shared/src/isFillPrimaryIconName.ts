/** Icon ids use `{category}-{style}-{name}` (e.g. `home-bold-Add-home`). */
export const isFillPrimaryIconName = (iconName: string): boolean => /-(bold|bulk)-/.test(iconName);

export const isStrokePrimaryIconName = (iconName: string): boolean =>
  /-(linear|outline|broken|twotone)-/.test(iconName);

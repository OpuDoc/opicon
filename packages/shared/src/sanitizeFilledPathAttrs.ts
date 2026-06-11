const STROKE_ATTR_NAMES = [
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-dasharray',
  'stroke-dashoffset',
] as const;

/** Remove per-path stroke attrs on fill-primary paths (legacy bold nodes from 0.1.5). */
export const sanitizeFilledPathAttrs = (
  tag: string,
  attrs: Record<string, string | number>,
  filled: boolean,
): Record<string, string | number> => {
  if (!filled || tag !== 'path') return attrs;

  const fill = attrs.fill;
  if (!fill || fill === 'none') return attrs;

  const result = { ...attrs };
  for (const name of STROKE_ATTR_NAMES) {
    delete result[name];
  }
  return result;
};

export const iconNodeElementAttrs = (
  tag: string,
  attrs: Record<string, string | number>,
  filled: boolean,
): Record<string, string | number> => {
  const { key: _key, ...rest } = attrs;
  return sanitizeFilledPathAttrs(tag, rest, filled);
};

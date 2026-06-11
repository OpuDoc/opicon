import { createElement } from 'react';
import Svg, { Circle, ClipPath, Defs, G, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';
import { getIconSvgPaintProps, iconNodeElementAttrs, mergeClasses } from '@opudoc/opicon-shared';
import type { IconNode, OpiconProps } from './types';

const TAG_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  svg: Svg,
  path: Path,
  g: G,
  rect: Rect,
  circle: Circle,
  line: Line,
  polyline: Polyline,
  polygon: Polygon,
  defs: Defs,
  clipPath: ClipPath,
};

interface IconComponentProps extends OpiconProps {
  iconNode: IconNode;
}

const renderNode = (
  node: IconNode[number],
  index: number,
  filled: boolean,
): ReturnType<typeof createElement> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const Component = TAG_MAP[tag] ?? tag;
    const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
    return createElement(
      Component,
      { key: key ?? index, ...rest },
      children.map((child, childIndex) => renderNode(child, childIndex, filled)),
    );
  }
  const [tag, attrs] = node;
  const Component = TAG_MAP[tag] ?? tag;
  const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
  return createElement(Component, { key: key ?? index, ...rest });
};

const Icon = ({ color, size = 24, strokeWidth = 2, absoluteStrokeWidth, className, iconNode, ...rest }: IconComponentProps) => {
  const paint = getIconSvgPaintProps(iconNode, { color, strokeWidth, absoluteStrokeWidth, size });

  return createElement(
    Svg,
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      color: paint.color,
      fill: paint.fill,
      stroke: paint.stroke,
      ...(paint.strokeWidth !== undefined && { strokeWidth: paint.strokeWidth }),
      className: mergeClasses('opicon', className),
      ...rest,
    },
    iconNode.map((node, index) => renderNode(node, index, paint.filled)),
  );
};

export default Icon;

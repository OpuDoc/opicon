import { createElement } from 'react';
import Svg, { Circle, ClipPath, Defs, G, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';
import { mergeClasses } from '@opudoc/opicon-shared';
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

const renderNode = (node: IconNode[number], index: number): ReturnType<typeof createElement> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const Component = TAG_MAP[tag] ?? tag;
    const { key, ...rest } = attrs;
    return createElement(
      Component,
      { key: key ?? index, ...rest },
      children.map((child, childIndex) => renderNode(child, childIndex)),
    );
  }
  const [tag, attrs] = node;
  const Component = TAG_MAP[tag] ?? tag;
  const { key, ...rest } = attrs;
  return createElement(Component, { key: key ?? index, ...rest });
};

const Icon = ({ color, size = 24, strokeWidth = 2, absoluteStrokeWidth, className, iconNode, ...rest }: IconComponentProps) => {
  const calculatedStrokeWidth = absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth;

  return createElement(
    Svg,
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color ?? 'currentColor',
      strokeWidth: calculatedStrokeWidth,
      className: mergeClasses('opicon', className),
      ...rest,
    },
    iconNode.map((node, index) => renderNode(node, index)),
  );
};

export default Icon;

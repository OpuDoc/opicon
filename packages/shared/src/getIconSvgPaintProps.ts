import { iconNodeUsesFill } from './iconNodeUsesFill';

type IconNodeEntry = [string, Record<string, string | number>, ...unknown[]];

export interface IconSvgPaintProps {
  color: string;
  fill: string;
  stroke: string;
  strokeWidth?: number | string;
  filled: boolean;
}

export const getIconSvgPaintProps = (
  iconNode: IconNodeEntry[],
  options: {
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    size?: number | string;
  } = {},
): IconSvgPaintProps => {
  const iconColor = options.color ?? 'currentColor';
  const filled = iconNodeUsesFill(iconNode);

  if (filled) {
    return {
      color: iconColor,
      fill: iconColor,
      stroke: 'none',
      filled: true,
    };
  }

  const strokeWidth = options.strokeWidth ?? 2;
  const calculatedStrokeWidth = options.absoluteStrokeWidth
    ? (Number(strokeWidth) * 24) / Number(options.size ?? 24)
    : strokeWidth;

  return {
    color: iconColor,
    fill: 'none',
    stroke: iconColor,
    strokeWidth: calculatedStrokeWidth,
    filled: false,
  };
};

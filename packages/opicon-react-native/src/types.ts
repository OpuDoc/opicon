import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

export type SVGProps = Record<string, string | number>;

export type IconNode = Array<[tag: string, attrs: SVGProps] | [tag: string, attrs: SVGProps, children: IconNode]>;

export interface OpiconProps extends SvgProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

export type OpiconIcon = ComponentType<OpiconProps>;

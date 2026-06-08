import type { ComponentType, JSX } from 'preact';

export type SVGProps = Record<string, string | number>;

export type IconNode = Array<[tag: string, attrs: SVGProps] | [tag: string, attrs: SVGProps, children: IconNode]>;

export interface OpiconProps extends JSX.HTMLAttributes<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

export type OpiconIcon = ComponentType<OpiconProps>;

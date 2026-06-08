import type { ForwardRefExoticComponent, RefAttributes, SVGProps as ReactSVGProps } from 'react';

export type SVGProps = Record<string, string | number>;

export type IconNode = Array<[tag: string, attrs: SVGProps] | [tag: string, attrs: SVGProps, children: IconNode]>;

export interface OpiconProps extends ReactSVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

export type OpiconIcon = ForwardRefExoticComponent<OpiconProps & RefAttributes<SVGSVGElement>>;

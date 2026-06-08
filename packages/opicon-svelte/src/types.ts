export type SVGProps = Record<string, string | number>;

export type IconNode = Array<[tag: string, attrs: SVGProps] | [tag: string, attrs: SVGProps, children: IconNode]>;

export interface OpiconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

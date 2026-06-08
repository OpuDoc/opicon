export type SVGProps = Record<string, string | number>;

export type IconNode = Array<[tag: string, attrs: SVGProps] | [tag: string, attrs: SVGProps, children: IconNode]>;

export type Icons = Record<string, IconNode>;

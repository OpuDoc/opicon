import defaultAttributes from './defaultAttributes';
import type { IconNode, SVGProps } from './types';

type CreateSVGElementParams = [tag: string, attrs: SVGProps, children?: IconNode];

const createSVGElement = ([tag, attrs, children]: CreateSVGElementParams): SVGElement => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.keys(attrs).forEach((name) => {
    if (name !== 'key') element.setAttribute(name, String(attrs[name]));
  });
  children?.forEach((child) => {
    element.appendChild(createSVGElement(child));
  });
  return element;
};

const createElement = (iconNode: IconNode, customAttrs: SVGProps = {}): SVGElement => {
  return createSVGElement(['svg', { ...defaultAttributes, ...customAttrs }, iconNode]);
};

export default createElement;

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { getIconSvgPaintProps, iconNodeElementAttrs } from '@opudoc/opicon-shared';
import type { IconNode } from './types';

@Component({
  selector: 'opicon-icon',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" #svg></svg>`,
})
export class OpiconIcon implements AfterViewInit {
  @Input({ required: true }) iconNode!: IconNode;
  @Input() size: number | string = 24;
  @Input() color = 'currentColor';
  @Input() strokeWidth: number | string = 2;
  @Input() absoluteStrokeWidth = false;
  @Input() class = '';

  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  constructor(private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const svg = this.svgRef.nativeElement;
    this.renderer.setAttribute(svg, 'width', String(this.size));
    this.renderer.setAttribute(svg, 'height', String(this.size));
    const paint = getIconSvgPaintProps(this.iconNode, {
      color: this.color,
      strokeWidth: this.strokeWidth,
      absoluteStrokeWidth: this.absoluteStrokeWidth,
      size: this.size,
    });
    this.renderer.setAttribute(svg, 'color', paint.color);
    this.renderer.setAttribute(svg, 'fill', paint.fill);
    this.renderer.setAttribute(svg, 'stroke', paint.stroke);
    if (paint.strokeWidth !== undefined) {
      this.renderer.setAttribute(svg, 'stroke-width', String(paint.strokeWidth));
    }
    if (this.class) this.renderer.setAttribute(svg, 'class', `opicon ${this.class}`);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    this.appendNodes(this.iconNode, svg, paint.filled);
  }

  private appendNodes(nodes: IconNode, parent: SVGElement, filled: boolean): void {
    nodes.forEach((node) => {
      if (node.length === 3) {
        const [tag, attrs, children] = node;
        const element = this.renderer.createElement(tag, 'svg');
        this.setAttrs(element, tag, attrs, filled);
        this.appendNodes(children, element, filled);
        this.renderer.appendChild(parent, element);
        return;
      }
      const [tag, attrs] = node;
      const element = this.renderer.createElement(tag, 'svg');
      this.setAttrs(element, tag, attrs, filled);
      this.renderer.appendChild(parent, element);
    });
  }

  private setAttrs(
    element: Element,
    tag: string,
    attrs: Record<string, string | number>,
    filled: boolean,
  ): void {
    Object.entries(iconNodeElementAttrs(tag, attrs, filled)).forEach(([name, value]) => {
      this.renderer.setAttribute(element, name, String(value));
    });
  }
}

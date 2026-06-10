import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { iconNodeUsesFill } from '@opudoc/opicon-shared';
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
    const filled = iconNodeUsesFill(this.iconNode);
    this.renderer.setAttribute(svg, 'color', this.color);
    this.renderer.setAttribute(svg, 'fill', filled ? this.color : 'none');
    this.renderer.setAttribute(svg, 'stroke', this.color);
    const strokeWidth = this.absoluteStrokeWidth
      ? (Number(this.strokeWidth) * 24) / Number(this.size)
      : this.strokeWidth;
    this.renderer.setAttribute(svg, 'stroke-width', String(strokeWidth));
    if (this.class) this.renderer.setAttribute(svg, 'class', `opicon ${this.class}`);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    this.appendNodes(this.iconNode, svg);
  }

  private appendNodes(nodes: IconNode, parent: SVGElement): void {
    nodes.forEach((node) => {
      if (node.length === 3) {
        const [tag, attrs, children] = node;
        const element = this.renderer.createElement(tag, 'svg');
        this.setAttrs(element, attrs);
        this.appendNodes(children, element);
        this.renderer.appendChild(parent, element);
        return;
      }
      const [tag, attrs] = node;
      const element = this.renderer.createElement(tag, 'svg');
      this.setAttrs(element, attrs);
      this.renderer.appendChild(parent, element);
    });
  }

  private setAttrs(element: Element, attrs: Record<string, string | number>): void {
    Object.entries(attrs).forEach(([name, value]) => {
      if (name !== 'key') this.renderer.setAttribute(element, name, String(value));
    });
  }
}

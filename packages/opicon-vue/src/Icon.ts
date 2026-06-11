import { defineComponent, h, type PropType } from 'vue';
import { getIconSvgPaintProps, iconNodeElementAttrs, mergeClasses } from '@opudoc/opicon-shared';
import type { IconNode } from './types';

const renderNode = (node: IconNode[number], filled: boolean): ReturnType<typeof h> => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
    return h(tag, { key, ...rest }, children.map((child) => renderNode(child, filled)));
  }
  const [tag, attrs] = node;
  const { key, ...rest } = iconNodeElementAttrs(tag, attrs, filled);
  return h(tag, { key, ...rest });
};

const Icon = defineComponent({
  name: 'OpiconIcon',
  props: {
    iconNode: { type: Array as PropType<IconNode>, required: true },
    size: { type: [Number, String], default: 24 },
    color: { type: String, default: 'currentColor' },
    strokeWidth: { type: [Number, String], default: 2 },
    absoluteStrokeWidth: { type: Boolean, default: false },
    class: { type: String, default: '' },
  },
  setup(props, { attrs }) {
    return () => {
      const paint = getIconSvgPaintProps(props.iconNode, {
        color: props.color,
        strokeWidth: props.strokeWidth,
        absoluteStrokeWidth: props.absoluteStrokeWidth,
        size: props.size,
      });

      return h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          color: paint.color,
          fill: paint.fill,
          stroke: paint.stroke,
          ...(paint.strokeWidth !== undefined && { strokeWidth: paint.strokeWidth }),
          class: mergeClasses('opicon', props.class),
          'aria-hidden': true,
          ...attrs,
        },
        props.iconNode.map((node) => renderNode(node, paint.filled)),
      );
    };
  },
});

export default Icon;

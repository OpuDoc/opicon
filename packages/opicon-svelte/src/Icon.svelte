<script>
  import { getIconSvgPaintProps, mergeClasses } from '@opudoc/opicon-shared';

  export let iconNode;
  export let size = 24;
  export let color = 'currentColor';
  export let strokeWidth = 2;
  export let absoluteStrokeWidth = false;
  export let className = '';

  $: paint = getIconSvgPaintProps(iconNode, { color, strokeWidth, absoluteStrokeWidth, size });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  color={paint.color}
  fill={paint.fill}
  stroke={paint.stroke}
  stroke-width={paint.strokeWidth}
  class={mergeClasses('opicon', className)}
  aria-hidden="true"
>
  {#each iconNode as node}
    {#if node.length === 3}
      {@const tag = node[0]}
      {@const attrs = node[1]}
      {@const children = node[2]}
      <svelte:element this={tag} {...attrs}>
        {#each children as child}
          {@const childTag = child.length === 3 ? child[0] : child[0]}
          {@const childAttrs = child.length === 3 ? child[1] : child[1]}
          <svelte:element this={childTag} {...childAttrs} />
        {/each}
      </svelte:element>
    {:else}
      {@const tag = node[0]}
      {@const attrs = node[1]}
      <svelte:element this={tag} {...attrs} />
    {/if}
  {/each}
</svg>

import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid.ts',
  outputName: 'opicon-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});

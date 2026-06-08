import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact.ts',
  outputName: 'opicon-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});

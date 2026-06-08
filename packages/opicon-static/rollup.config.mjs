import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static.ts',
  outputName: 'opicon-static',
});

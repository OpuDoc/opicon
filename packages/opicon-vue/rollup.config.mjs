import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue.ts',
  outputName: 'opicon-vue',
  external: ['vue', '@opubase/opicon-shared'],
});

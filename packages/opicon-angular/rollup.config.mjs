import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular.ts',
  outputName: 'opicon-angular',
  external: ['@angular/core'],
});

import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react.ts',
  outputName: 'opicon-react',
  external: ['react', 'react/jsx-runtime', '@opubase/opicon-shared'],
});

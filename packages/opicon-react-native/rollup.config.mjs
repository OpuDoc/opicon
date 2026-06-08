import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native.ts',
  outputName: 'opicon-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opubase/opicon-shared'],
});

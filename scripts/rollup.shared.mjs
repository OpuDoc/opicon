import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export function createRollupConfig({ pkg, entry, outputName, external = [], banner }) {
  const inputs = Array.isArray(entry) ? entry : [entry];

  const bundles = [
    {
      format: 'cjs',
      dir: 'dist/cjs',
      extension: 'js',
      preserveModules: false,
    },
    {
      format: 'esm',
      dir: 'dist/esm',
      extension: 'mjs',
      preserveModules: true,
    },
  ];

  const configs = bundles.flatMap(({ format, dir, extension, preserveModules }) =>
    inputs.map((input) => ({
      input,
      external,
      plugins: [
        nodeResolve({ extensions: ['.js', '.ts', '.tsx', '.svelte', '.astro'] }),
        esbuild({
          include: /\.[jt]sx?$/,
          exclude: /node_modules/,
          tsconfig: './tsconfig.json',
          jsx: 'automatic',
        }),
      ],
      output: {
        banner,
        dir: preserveModules ? dir : undefined,
        file: preserveModules ? undefined : `${dir}/${outputName}.${extension}`,
        format,
        preserveModules,
        preserveModulesRoot: 'src',
        entryFileNames: `[name].${extension}`,
        sourcemap: true,
      },
    })),
  );

  return [
    ...configs,
    {
      input: inputs[0],
      output: [{ file: `dist/${outputName}.d.ts`, format: 'es' }],
      plugins: [dts()],
    },
  ];
}

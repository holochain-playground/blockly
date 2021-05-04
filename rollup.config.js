import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const pkg = require('./package.json');

export const plugins = [
  replace({
    'root.Blockly = factory()': '',
  }),
  typescript(),
  resolve({
    preferBuiltins: false,
    browser: true,
    mainFields: ['browser', 'module', 'main'],
  }),
  commonjs({
    include: ['node_modules/blockly/**/*', 'node_modules/blakejs/**/*'],
  }),
];

export default {
  input: `src/index.ts`,
  output: { dir: 'dist', format: 'es', sourcemap: true },
  external: [
    ...Object.keys(pkg.dependencies).filter(key => !key.includes('blockly')),
    /scoped-material-components/,
    /lit-html/,
    'lodash-es',
  ],
  plugins,
};

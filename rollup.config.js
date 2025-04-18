import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx']
    }),
    postcss({
      extensions: ['.css'],
      minimize: process.env.NODE_ENV === 'production',
      inject: true
    }),
    image(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }),
    commonjs(),
    process.env.NODE_ENV === 'production' && terser()
  ],
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
    '@mui/system',
    '@tanstack/react-router'
  ]
};
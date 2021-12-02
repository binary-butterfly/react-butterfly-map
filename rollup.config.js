import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import svgr from '@svgr/rollup';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {terser} from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;

const config = {
    input: 'assets/js/Root.js',
    output: {
        file: 'dist/react-butterfly-map.js',
        format: 'cjs',
        sourcemap: env !== 'production',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
        name: 'ReactButterflyMap',
        inlineDynamicImports: true,
    },
    plugins: [
        alias({
            entries: [
                {find: 'mapbox-gl', replacement: 'maplibre-gl'},
            ],
        }),
        svgr(),
        styles(),
        nodeResolve({
            browser: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
        commonjs({
            exclude: 'assets/**',
            namedExports: {
                'react': Object.keys(React),
                'react-dom': Object.keys(ReactDOM),
                'react-is': Object.keys(require('react-is')),
                'prop-types': Object.keys(PropTypes),
            },
        }),
        babel({
            'babelHelpers': 'runtime',
            'presets': [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'browsers': [
                                'last 2 versions',
                                'safari >= 14',
                                'edge >= 44',
                                'not op_mini all',
                            ],
                        },
                    },
                ],
                '@babel/preset-react',
            ],
            'plugins': [
                '@babel/plugin-transform-runtime',
                'babel-plugin-styled-components',
            ],
            'ignore': [
                './node_modules/maplibre-gl/',
                './node_modules/mapbox-gl/',
            ],
        }),
        globals(),
        replace({'process.env.NODE_ENV': JSON.stringify(env === 'production' ? 'production' : 'development')}),
    ],
};

if (env === 'production') {
    config.input = 'assets/js/components/ButterflyMap.js';
    config.output.file = 'dist/react-butterfly-map.min.js';
    config.external = [
        'react',
        'reactDOM',
    ]
    config.plugins.push(terser())
}

export default config;

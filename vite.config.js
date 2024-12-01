import {resolve} from 'path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig(({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [
            react(),
            dts(
                {tsconfigPath: 'build.tsconfig.json'},
            ),
        ],
        build: {
            sourcemap: true,
            lib: {
                entry: resolve(__dirname, 'src/js/components/ButterflyMap.tsx'),
                name: 'ReactButterflyMap',
                fileName: 'reactButterflyMap',
            },
            rollupOptions: {
                external: [
                    'react',
                    'reactDOM',
                    'prop-types',
                ],
                output: {
                    globals: {
                        'react': 'React',
                        'react-dom': 'ReactDOM',
                        'prop-types': 'PropTypes',
                    },
                    inlineDynamicImports: true,
                    exports: 'auto',
                },
            },
            server: {
                open: '/src/index.html',
            },
        },

        define: {
            'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
            'preventAssignment': true,
        },
    });
});

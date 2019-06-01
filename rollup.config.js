import livereload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const outputFileName = 'canvas-circular-audio'
const isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
    commonjs(),
    resolve(),
    babel(),
]
const devPlugins = [
    serve({
        open: true,
        openPage: '/demo.html',
        contentBase: ['./demo', './dist'],
        host: 'localhost',
        port: 8080,
    }),
    livereload({
        watch: ['./demo', './dist']
    })
]
const prodPlugins = [
    terser()
]
const plugins = isProd ? [...basePlugins, ...prodPlugins] : [...devPlugins, ...basePlugins]

export default {
    input: './src/main.js',
    output: [
        {
            dir: './dist',
            entryFileNames: isProd ? `${outputFileName}.min.js` : `${outputFileName}.js`,
            format: 'iife',
            name: 'CanvasCirclularAudio'
        },
        {
            dir: './dist',
            entryFileNames: isProd ? `${outputFileName}.es.min.js` : `${outputFileName}.es.js`,
            format: 'es'
        }
    ],
    plugins,
    watch: {
        include: './src/**'
    }
}
const presets = [
    [
        '@babel/env',
        {
            targets: {
                'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
            },
            useBuiltIns: 'usage',
            modules: false,
            corejs: '3'
        },
    ],
]

const exclude = ['node_modules/**']

module.exports = { presets, exclude }
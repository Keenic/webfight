const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')

module.exports = {
    entry: {
        app: ['./game/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
        }
    },
    module: {
        rules: [
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-arcade-physics\.js$/, use: ['expose-loader?Phaser'] },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'game/index.ejs',
        })
    ]
};

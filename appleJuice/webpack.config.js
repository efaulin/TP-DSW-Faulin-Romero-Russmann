/*import {fileURLToPath} from 'url';
import path from 'path';

import nodeExternals from 'webpack-node-externals';
import BundleDeclarationsWebpackPlugin from 'bundle-declarations-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ResolveTypescriptPlugin from 'resolve-typescript-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    // experiments: {
    //     outputModule: true
    // },
    entry: {
        index: './src/script/match.ts',
    },
    resolve: {
        fullySpecified: true,
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './tsconfig.json',
            extensions: ['.ts', '.js']
        }), new ResolveTypescriptPlugin()]
    },
    module: {
    rules: [
      { test: /.ts$/, use: 'ts-loader' },
    ],
  },
};*/

import {fileURLToPath} from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    entry: {
        match: './src/script/match.ts',
        roomList: './src/script/roomList.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: 'public',
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    /*devServer: {
        static: {
            directory: path.join(__dirname, '../../dist/client'),
        },
        hot: true,
        proxy: {
            '/socket.io': {
                target: 'http://127.0.0.1:3000',
                ws: true,
            },
        },
    },*/
};
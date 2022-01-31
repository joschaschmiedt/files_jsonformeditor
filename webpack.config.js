// const webpack = require('webpack')
// const webpackConfig = require('@nextcloud/webpack-vue-config')

// // this isn't working
// webpackConfig.plugins.push(
// 	new webpack.ProvidePlugin({
// 		$: 'jquery',
// 		jQuery: 'jquery',
// 	}),
// )

// module.exports = webpackConfig

/**
 * @copyright Copyright (c) 2020 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const appName = process.env.npm_package_name
const appVersion = process.env.npm_package_version
const buildMode = process.env.NODE_ENV
const isDev = buildMode === 'development'
console.info('Building', appName, appVersion, '\n')

// const rules = require('./rules'
const rules = {
	RULE_CSS: {
		test: /\.css$/,
		use: ['style-loader', 'css-loader'],
	},
	RULE_SCSS: {
		test: /\.scss$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	},
	RULE_VUE: {
		test: /\.vue$/,
		loader: 'vue-loader',
	},
	RULE_JS: {
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
	},
	RULE_ASSETS: {
		test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
		type: 'asset/inline',
	},
}

module.exports = {
	 target: 'web',
	 mode: buildMode,
	 devtool: isDev ? 'cheap-source-map' : 'source-map',

	 entry: {
		 main: path.resolve(path.join('src', 'main.js')),
	 },
	 output: {
		 path: path.resolve('./js'),
		 publicPath: path.join('/apps/', appName, '/js/'),
		 filename: `${appName}-[name].js?v=[contenthash]`,
		 chunkFilename: `${appName}-[name].js?v=[contenthash]`,
		 // Make sure sourcemaps have a proper path and do not
		 // leak local paths https://github.com/webpack/webpack/issues/3603
		 devtoolNamespace: appName,
		 devtoolModuleFilenameTemplate(info) {
			 const rootDir = process.cwd()
			 const rel = path.relative(rootDir, info.absoluteResourcePath)
			 return `webpack:///${appName}/${rel}`
		 },
	 },

	 devServer: {
		 hot: true,
		 host: '127.0.0.1',
		 port: 3000,
		 client: {
			 overlay: false,
		 },
		 devMiddleware: {
			 writeToDisk: true,
		 },
		 headers: {
			 'Access-Control-Allow-Origin': '*',
		 },
	 },

	 optimization: {
		 chunkIds: 'named',
		 splitChunks: {
			 automaticNameDelimiter: '-',
		 },
		 minimize: !isDev,
		 minimizer: [
			 new TerserPlugin({
				 terserOptions: {
					 output: {
						 comments: false,
					 },
				 },
				 extractComments: true,
			 }),
		 ],
	 },

	 module: {
		 rules: Object.values(rules),
	 },

	 plugins: [
		 new ESLintPlugin({
			 extensions: ['js', 'vue'],
			 files: 'src',
			 failOnError: !isDev,
		 }),

		 new VueLoaderPlugin(),
		 new StyleLintPlugin({
			 files: 'src/**/*.{css,scss,vue}',
			 failOnError: !isDev,
		 }),

		 // Make sure we auto-inject node polyfills on demand
		 // https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
		 new NodePolyfillPlugin(),

		 // Make appName & appVersion available as a constant
		 new webpack.DefinePlugin({ appName: JSON.stringify(appName) }),
		 new webpack.DefinePlugin({ appVersion: JSON.stringify(appVersion) }),
		 new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	 ],

	 resolve: {
		 extensions: ['*', '.js', '.vue'],
		 symlinks: false,
	 },
}

// const webpack = require('webpack')

// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//   devtool: 'source-map',
//   entry: {
//     editor: './js/index.js',
//     'public-share': './js/public-share.js',
//   },
//   output: {
//     filename: '[name].js',
//     chunkFilename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'build'),
//     uniqueName: 'files_jsonformeditor',
//   },
//   optimization: {
//     minimize: false,
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new webpack.ProvidePlugin({
//       $: require.resolve('jquery'),
//       jQuery: require.resolve('jquery'),
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         include: [path.resolve(__dirname, 'js')],
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['css-loader'],
//       },
//       {
//         test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {},
//           },
//         ],
//       },
//     ],
//   },
// }

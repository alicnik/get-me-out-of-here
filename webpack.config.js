const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist'),
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.(png|jpe?g|gif)$/i, use: 'file-loader' },
		],
	},
	devServer: {
		contentBase: path.resolve('src'),
		hot: true,
		open: true,
		port: 8000,
		watchContentBase: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			inject: 'body',
		}),
	],
}

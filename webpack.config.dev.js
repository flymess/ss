/**
 * Created by tao on 2016/11/22.
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		vendor:['vue','vuex','vue-router'],
		home:path.join(__dirname,'./home.js')
	},
	// where to place the compiled bundle
	output: {
		path: './src/assets/',
		publicPath:'/',
		filename: 'js/[name].bundle.js',
		chunkFilename:'js/[chunkhash:8].js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity //Infinity
		}),
		new ExtractTextPlugin('style/[chunkhash:8].css', { allChunks: true }),
		new HtmlWebpackPlugin({
			title: "K12",
			template: path.join(__dirname,'./home.html'),
			filename: '../../index.html',
			inject: true
		})
	],
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{test: /\.json$/,loader: 'json'},
			{
				test: /\.js$/,
				loaders:[ 'babel'],
				exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/
			},
			{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style','css!sass') },
			{test: /\.(jpg|png)$/, loader: "url?limit=8192"}//不大于8K的图片打包成base64,
		]
	},
	babel:{
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	vue: {
		loaders: {
			js:'babel',
			css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader'),
			exclude: /node_modules/
		}
	},
	watch:true
}
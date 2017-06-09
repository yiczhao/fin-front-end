/**
 * webpack 配置
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
	
	entry:{
		app:__dirname+'/dev/js/app.js',
		jquery: __dirname+'/dev/js/assets/jQuery.min.js',
		bootstrap: __dirname+'/dev/js/assets/bootstrap.min.js',
	},
	output:{
		path:__dirname+'/dist',
		filename:'[name].js',
		chunkFilename: '[name].[chunkhash:8].js',
		publicPath: '/dist/'
	},
	module:{

		loaders:[
			{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass-loader-once')
            },
            {
                test: /\.(tpl|html)$/,
                loader: 'html'
            },
            {
	            test: /\.vue$/,
	            loader: 'vue',
	        },
			{
	            test: /\.js$/,
		        // excluding some local linked packages.
		        // for normal use cases only node_modules is needed.
		        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
		        loader: 'babel'
		        
	        },
            // {test: /\.(js|tag)$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
		]
	},
	babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
	plugins:[
		new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new ExtractTextPlugin('app.css'),
		new webpack.BannerPlugin('This file is created by yicZhao'),
		new webpack.ProgressPlugin(function (percentage, msg) {
			console.log( Math.round(percentage * 100) + '% ---> ' + msg)
		}),
		new webpack.ProvidePlugin({
			_: 'lodash',
			swal: 'sweetalert',
			'window._':'lodash'
		})
	]
};
/**
 * webpack 配置
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	resolve: {
		alias: {

		}
	},
	entry:{
		app:__dirname+'/dev/js/app.js',
		jquery: __dirname+'/dev/js/assets/jQuery.min.js',
		bootstrap: __dirname+'/dev/js/assets/bootstrap.min.js',
	},
	output:{
		path:__dirname+'/dist',
		filename:'[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/dist/'
	},
	module:{
		noParse: [],
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
		],
		devtool: 'source-map'
	},
	babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
	plugins:[
		new ExtractTextPlugin('app.css'),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
			},
		}),
		new webpack.ProvidePlugin({
			_: 'lodash',
			swal: 'sweetalert',
			'window._':'lodash'
		})
	]
};
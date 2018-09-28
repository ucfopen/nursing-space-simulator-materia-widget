// const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
let baseConfig = require('materia-widget-development-kit/webpack-widget').getLegacyWidgetBuildConfig()

baseConfig.entry = {
	'js/creator.js': ['./src/js/creator.js'],
	'js/player.js': ['./src/js/player.js'],
	'creator.css': ['./src/creator.scss', './src/creator.html'],
	'player.css': ['./src/player.css', './src/player.html'],
	'custom-joyride.css': ['./src/custom-joyride.css'],
	'react-joyride-compiled.css': ['./src/react-joyride-compiled.css']
}

var baseModuleRules = require('materia-widget-development-kit/webpack-widget').getDefaultRules()

baseConfig.module.rules = [
	baseModuleRules.copyImages,
	baseModuleRules.loadHTMLAndReplaceMateriaScripts,
	baseModuleRules.loadAndPrefixCSS,
	baseModuleRules.loadAndPrefixSASS
]

baseConfig.module.rules.push({
		test: /\.js$/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['babel-preset-env']
			}
		},
		exclude: /(node_modules|bower_components)/,
	})

module.exports = baseConfig

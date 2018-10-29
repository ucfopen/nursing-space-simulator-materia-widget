
// grab webpack config from MWDK
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')

// replace default entries
const entries = {
	'js/creator.js': ['./src/js/creator.js'],
	'js/player.js': ['./src/js/player.js'],
	'creator.css': ['./src/creator.scss', './src/creator.html'],
	'player.css': ['./src/player.css', './src/player.html'],
	'custom-joyride.css': ['./src/custom-joyride.css'],
	'react-joyride-compiled.css': ['./src/react-joyride-compiled.css']
}

// get default ruleset from widget config - need to create new ruleset by bundling default + custom
const rules = widgetWebpack.getDefaultRules()

// create new JS rules for transpiling babel (vs. raw-loader, the default)
const customDoNothingToJs = {
		test: /\.js$/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['babel-preset-env']
			}
		},
		exclude: /(node_modules|bower_components)/,
}

// create new ruleset
const customRules = [
	customDoNothingToJs,
	rules.loadAndPrefixCSS,
	rules.loadAndPrefixSASS,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.copyImages,
]

// create options object to pass to build config
const options = {
	moduleRules: customRules,
	entries: entries
}

const config = widgetWebpack.getLegacyWidgetBuildConfig(options)

module.exports = config

module.exports = function(config) {
	config.set({
		// Template Note: Supposed to refresh console when test file changes are made.
		autoWatch: true,
		// Template Note: Typically left unchanged.
		basePath: './',
		// Template Note: Change only if you're using a headless browser other than PhantomJS.
		browsers: ['PhantomJS'],
		// Template Note: Files loaded into framework. Order matters.
		files: [
			'../../js/materia.creatorcore.js',
			'../../js/*.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-sanitize/angular-sanitize.js',
			'build/demo.json',
			'build/modules/*.js',
			'build/controllers/*.js',
			'tests/*.js'
		],
		// Template Note: Change only if you're using a test framework other than Jasmine (ie. Chai).
		frameworks: ['jasmine'],
		// Template Note: Change only if using a test scaffolding other than Karma-Jasmine-Phantom.
		// 'karma-json-fixtures-preprocessor' is specifically used to load in the demo file for testing.
		plugins: [
			'karma-coverage',
			'karma-eslint',
			'karma-jasmine',
			'karma-json-fixtures-preprocessor',
			'karma-mocha-reporter',
			'karma-phantomjs-launcher'
		],
		// Template Note: Pluggins run on these files before tests are run.
		preprocessors: {
			'build/modules/*.js': ['coverage', 'eslint'],
			'build/controllers/*.js': ['coverage', 'eslint'],
			'build/demo.json': ['json_fixtures']
		},
		// Template Note: Plugin-specific configurations.
		eslint: {
			stopOnError: true,
			stopOnWarning: false,
			showWarnings: true,
			engine: {
				configFile: '.eslintrc.json'
			}
		},
		// Template Note: Names the variable containing the demo file. Only use if loading in demo file.
		jsonFixturesPreprocessor: {
			variableName: '__demo__'
		},
		// Template Note: Method of reporting test results. Leave if using 'coverage' and 'mocha'.
		reporters: ['coverage', 'mocha'],
		//Template Note: Reporter-specific configurations
		coverageReporter: {
			check: {
				global: {
					statements: 100,
					branches:   80,
					functions:  90,
					lines:      90
				},
				each: {
					statements: 100,
					branches:   80,
					functions:  90,
					lines:      90
				}
			},
			reporters: [
				{ type: 'html', subdir: 'report-html' },
				{ type: 'cobertura', subdir: '.', file: 'coverage.xml' }
			]
		},
		mochaReporter: {
			output: 'autowatch'
		}
	});
};

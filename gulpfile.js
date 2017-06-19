var argv = require("yargs").argv;
var autoprefix = require("gulp-autoprefixer");
var babelify = require("babelify");
var browserify = require("browserify");
var browserifyshim = require("browserify-shim");
var buffer = require("vinyl-buffer");
var clean = require("gulp-clean");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var exec = require("child_process").exec;
var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var print = require("gulp-print");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var replaceTask = require("gulp-replace-task");
var runSequence = require("run-sequence");
var sass = require("gulp-sass");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var zip = require("gulp-zip");

// If built outside of devmateria, avoid looking for the config file.
var configs = null;
try {
	configs = require("../../backend/config.json");
} catch (e) {
	console.log(e);
}

var widget = sanitize("hospital-sim");

// When compiling this may be entered as an argument.
var minify = argv.minify;
var mangle = argv.mangle;
var embed = argv.embed;
// GUI can define which tasks are avoided based on desired outcome.
var Embedding = embed === "false" ? false : true;
var Mangling = mangle === "false" ? false : true;
var Minifying = minify === "false" ? false : true;

// Changes between normal build and test build ('build/')
var buildLocation = ".build/";
// Since it is 'server.coffee' in the backend/ folder, this string points
// to this widget's source files from server.coffee's perspective.
var sourceString = "";

// Points to the necessary faux materia files than help devmateria run.
var materiaJsReplacements = [
	{
		match: /src="materia.enginecore.js"/g,
		replacement: function() {
			return 'src="../../../js/materia.enginecore.js"';
		}
	},
	{
		match: /src="materia.score.js"/g,
		replacement: 'src="../../../js/materia.score.js"'
	},
	{
		match: /src="materia.creatorcore.js"/g,
		replacement: 'src="../../../js/materia.creatorcore.js"'
	},
	{
		match: /src="materia.creatorcore.js"/g,
		replacement: 'src="../../../js/materia.creatorcore.js"'
	},
	{
		match: /src="materia.storage.manager.js"/g,
		replacement: 'src="../../../js/materia.storage.manager.js"'
	},
	{
		match: /src="materia.storage.table.js"/g,
		replacement: 'src="../../../js/materia.storage.table.js"'
	}
];

// Cleans folder of any old files before populating with the newest run.
gulp.task("clean:pre", function() {
	gutil.log("Clean:pre Running");
	return gulp
		.src([sourceString + buildLocation])
		.pipe(clean())
		.on("error", function(msg) {
			console.log("clean:pre Fail Error: ", msg.toString());
		})
		.pipe(print());
});

// Removes old zip file before creating new one.
gulp.task("clean:package", function() {
	gutil.log("Clean:package Running");
	return gulp
		.src(sourceString + buildLocation + "_output/" + widget + ".zip")
		.pipe(clean({ force: true }))
		.on("error", function(msg) {
			console.log("clean:package Fail Error: ", msg.toString());
		})
		.pipe(print());
});

/**
 * Copy Initial Files
 *
 * The following tasks copy files from the src directory, and places the files in the
 * ./build directory. Each task handles a single subdirectory within the src directory.
 */
// Copy files and assets in the beginning
gulp.task("copy:init-assets", function() {
	gutil.log("Copy:init-assets Running");
	// Copy assets
	return gulp
		.src([sourceString + "src/assets/*", sourceString + "src/assets/**/*"])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "assets/"));
});

gulp.task("copy:init-baseWidgetFiles", function() {
	gutil.log("Copy:init-baseWidgetFiles Running");
	// Copy non-prepocessed files
	return gulp
		.src([
			sourceString + "src/install.yaml",
			sourceString + "src/demo.json",
			sourceString + "src/*.html",
			sourceString + "src/*.css",
			sourceString + "src/creator.js"
		])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
});

gulp.task("copy:init-export", function() {
	gutil.log("Copy:init-export Running");
	// Copy Files
	return gulp
		.src([sourceString + "src/_exports/export_module.php"])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "_export/"));
});

gulp.task("copy:init-icons", function() {
	gutil.log("Copy:init-icons Running");
	// Copy assets
	return gulp
		.src([sourceString + "src/_icons/*"])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "img/"));
});

gulp.task("copy:init-screenshots", function() {
	gutil.log("Copy:init-screenshots Running");
	// Copy assets
	return gulp
		.src([sourceString + "src/_screen-shots/*"])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "img/screen-shots/"));
});

gulp.task("copy:init-score", function() {
	gutil.log("Copy:init-score Running");
	// Copy Files
	return gulp
		.src([sourceString + "src/_score/*.*"])
		.on("error", function(msg) {
			console.log("copy:init Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "_score-modules/"));
});

/**
 * Transcompilation
 */

// Transpiles Sass into plain CSS.
gulp.task("sass", function() {
	gutil.log("Sass Running");
	// Engine
	return gulp
		.src(sourceString + "src/*.scss")
		.pipe(
			sass().on("error", function(msg) {
				console.log("sass Fail Error: ", msg.toString());
			})
		)
		.pipe(print())
		.pipe(
			autoprefix().on("error", function(msg) {
				console.log("sass Fail Error: ", msg.toString());
			})
		)
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
});

// Transpiles ES6 code to ES5, and uglifies the source
gulp.task("babel", function() {
	return (browserify({ entries: sourceString + "src/js/player.js" })
			.external(["aframe"])
			.transform(babelify, { presets: ["es2015", "react"] })
			.transform(browserifyshim)
			.bundle()
			.pipe(source("player.js"))
			.pipe(buffer())
			//.pipe(uglify())
			.pipe(gulp.dest(sourceString + buildLocation + "js")) );
});

/**
 * 
 */

// Replaces file path data based off of preset patterns.
gulp.task("replace:materiaJS", function() {
	gutil.log("Replace Materia JS Running");
	return gulp
		.src([sourceString + buildLocation + "*.html"])
		.pipe(print())
		.pipe(replaceTask({ patterns: materiaJsReplacements }))
		.on("error", function(msg) {
			console.log("replace:materiaJS Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
});

/**
 * Minification
 */

// Minifies the project css files
gulp.task("cssmin", function() {
	if (Minifying) {
		gutil.log("CSS Min Running");
		return gulp
			.src([sourceString + buildLocation + "**/*.css"])
			.pipe(cssmin())
			.on("error", function(msg) {
				console.log("copy:init Fail Error: ", msg.toString());
			})
			.pipe(print())
			.pipe(gulp.dest(sourceString + buildLocation));
	}
	return "";
});

// Replaces all of the (internally sourced) script tags in the player/creator files with
// a combined script tag referenceing a single player.js/creator.js source
gulp.task("minify-player-js", function() {
	if (Embedding && Minifying) {
		gutil.log("Minify Player JS Running");
		return minifyJs("player");
	}
	return "";
});

gulp.task("minify-creator-js", function() {
	if (Embedding && Minifying) {
		gutil.log("Minify Creator JS Running");
		return minifyJs("creator");
	}
	return "";
});

// Replaces all of the (internally sourced) link tags in the player/creator files with
// a combined link tag referenceing a single player.css/creator.css source
gulp.task("minify-player-css", function() {
	if (Embedding && Minifying) {
		gutil.log("Minify Player CSS Running");
		return minifyCss("player");
	}
	return "";
});
gulp.task("minify-creator-css", function() {
	if (Embedding && Minifying) {
		gutil.log("Minify Creator CSS Running");
		return minifyCss("creator");
	}
	return "";
});

/**
 * Embed
 */

// Injects css and js files into the html
gulp.task("embed", function() {
	if (Embedding && Minifying) {
		gutil.log("Embed Running");
		return gulp
			.src(sourceString + buildLocation + "*.html")
			.pipe(
				replace(/<link.*href="player.css"[^>]*>/, function(s) {
					var style = fs.readFileSync(
						sourceString + buildLocation + "player.css",
						"utf8"
					);
					return "<style>\n" + style + "\n</style>";
				})
			)
			.pipe(
				replace(/<link.*href="creator.css"[^>]*>/, function(s) {
					var style = fs.readFileSync(
						sourceString + buildLocation + "creator.css",
						"utf8"
					);
					return "<style>\n" + style + "\n</style>";
				})
			)
			.pipe(
				replace(/<script.*src=\"player.js\"><\/script>/, function(s) {
					var script = fs.readFileSync(
						sourceString + buildLocation + "player.js",
						"utf8"
					);
					return "<script>\n" + script + "\n</script>";
				})
			)
			.pipe(
				replace(/<script.*src=\"creator.js\"><\/script>/, function(s) {
					var script = fs.readFileSync(
						sourceString + buildLocation + "creator.js",
						"utf8"
					);
					return "<script>\n" + script + "\n</script>";
				})
			)
			.on("error", function(msg) {
				console.log("inject Fail Error: ", msg.toString());
			})
			.pipe(print())
			.pipe(gulp.dest(sourceString + buildLocation));
	}
	return "";
});

/**
 * 
 */

// Replaces file path data based off of preset patterns.
gulp.task("replace:build", function() {
	gutil.log("Replace Build Running");
	return gulp
		.src([sourceString + buildLocation + "*.html"])
		.pipe(
			replaceTask({
				patterns: [
					{ match: /\n\t/g, replacement: "" },
					{ match: /\s{2,}/g, replacement: " " }
				]
			})
		)
		.on("error", function(msg) {
			console.log("replace:build Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
});

// Copy zipped package into the "output" folder
gulp.task("rename:ext", function() {
	gutil.log("Rename Ext Running");
	return gulp
		.src([sourceString + buildLocation + "_output/*.zip"])
		.pipe(rename({ extname: ".wigt" }))
		.on("error", function(msg) {
			console.log("rename:ext Fail Error: ", msg.toString());
		})
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation + "_output/"));
});

/**
 * 
 */

// Squish those files and assets into that zip file
gulp.task("compress", function() {
	gutil.log("Compress Running");
	return gulp
		.src([
			sourceString + buildLocation + "**/*",
			"!" + sourceString + buildLocation + "*.coffee",
			"!" + sourceString + buildLocation + "**/*.coffee",
			"!" + sourceString + buildLocation + "*.scss",
			"!" + sourceString + buildLocation + "**/*.scss",
			"!" + sourceString + buildLocation + "*.zip",
			"!" + sourceString + buildLocation + "*.wigt"
		])
		.pipe(print())
		.pipe(zip(widget + ".zip"))
		.on("error", function(msg) {
			console.log("compress Fail Error: ", msg.toString());
		})
		.pipe(gulp.dest(sourceString + buildLocation + "_output/"));
});

gulp.task("default", function() {
	buildLocation - ".build/";

	runSequence(
		"clean:pre",
		"clean:package",
		"copy:init-assets",
		"copy:init-baseWidgetFiles",
		"copy:init-export",
		"copy:init-icons",
		"copy:init-screenshots",
		"copy:init-score",
		"cssmin",
		"sass",
		"replace:materiaJS",
		"cssmin",
		"babel",
		"minify-player-js",
		"minify-creator-js",
		"minify-player-css",
		"minify-creator-css",
		"embed",
		"replace:build",
		"compress",
		"rename:ext",
		"clean:package"
	);
});

// Built through the devmateria GUI via server.coffee if widget is in devmateria.
exports["gulp"] = function(widget, minify, mangle, embed, callback) {
	widget = sanitize(widget);
	sourceString = "sandbox/" + widget + "/";

	buildLocation = ".build/";

	console.log(
		"widget: ",
		widget,
		"\nEmbed: ",
		embed,
		"\nMangle: ",
		mangle,
		"\nMinify: ",
		minify
	);

	Embedding = embed === "false" ? false : true;
	Mangling = mangle === "false" ? false : true;
	Minifying = minify === "false" ? false : true;

	// One of the ways to make sure Gulp does it's tasks in the order specified (Otherwise race condtions can occur).
	gulp.task("callback", function() {
		return callback(null, null, "");
	});

	runSequence(
		"clean:pre",
		"copy:init-assets",
		"copy:init-baseWidgetFiles",
		"copy:init-export",
		"copy:init-icons",
		"copy:init-screenshots",
		"copy:init-score",
		"cssmin",
		"sass",
		"replace:materiaJS",
		"cssmin",
		"babel",
		"minify-player-js",
		"minify-creator-js",
		"minify-player-css",
		"minify-creator-css",
		"embed",
		"replace:build",
		"compress",
		"rename:ext",
		"clean:package",
		"callback"
	);
};

exports["install"] = function(callback) {
	return fullExport(callback);
};

/**
 * Extraneous Functions
 * 
 * Functions used in the gulp tasks organized alphabetically
 */

var fullExport = function(callback) {
	var widgetPackagePostFix = Date.now();

	var totalCommand =
		"cd " +
		__dirname.slice(0, -widget.length) +
		" && find " +
		configs.materia_docker_location +
		"/app/fuel/app/tmp/widget_packages -name '" +
		widget +
		"*.wigt' -delete" +
		" && cd " +
		configs.materia_docker_location +
		" && cp " +
		__dirname.slice(0, -(widget.length + 8)) +
		"sandbox/" +
		widget +
		"/.build/_output/" +
		widget +
		".wigt app/fuel/app/tmp/widget_packages/" +
		widget +
		"-" +
		widgetPackagePostFix +
		".wigt" +
		" && eval $(docker-machine env " +
		configs.materia_docker_machine_name +
		")" +
		" && ./install_widget.sh " +
		widget +
		"-" +
		widgetPackagePostFix +
		".wigt";

	return exec(totalCommand, function(err, stdout, stderr) {
		//TODO: Convert to a match with new docker install responses.
		var match = stdout.match(/installed\:\ ([A-Za-z0-9\-]+)/);
		// If user doesn't edit their config.json file's materia-docker path properly to match their local machine, this will tell them, and how to fix it.
		var badFilePathError = new RegExp(
			"find: " +
				configs.materia_docker_location +
				"/app/fuel/app/tmp/widget_packages",
			"g"
		);
		var match2 = stderr.match(badFilePathError);
		// If user doesn't edit their config.json file's docker-machine name properly to match their local machine, this will tell them, and how to fix it.
		var invalidHostName = new RegExp(
			'Host does not exist: "' + configs.materia_docker_machine_name + '"',
			"g"
		);
		var match3 = stderr.match(invalidHostName);
		// Installed correctly?
		if (match && match[1]) {
			gutil.log(match[1]);
			return callback(match[1]);
		} else if (match2 && match2[0]) {
			// Bad path in config.json.
			gutil.log(
				"Bad File Path in config.json (see README.txt, item #2 -- bullet 3)"
			);
			return callback(
				"",
				"Bad File Path in config.json (see README.txt, item #2 -- bullet 3)"
			);
		} else if (match3 && match3[0]) {
			// Invalid docker-machine name in config.json.
			gutil.log(
				"Invalid Host Name in config.json (see README.txt, item #2 -- bullet 5)"
			);
			return callback(
				"",
				"Invalid Host Name in config.json (see README.txt, item #2 -- bullet 5)"
			);
		} else {
			// Default to catch everything else that goes wrong.
			gutil.log(stdout + stderr);
			return callback("", stderr);
		}
	});
};

function minifyCss(htmlName) {
	var assets = [];
	var data = fs.readFileSync(sourceString + buildLocation + htmlName + ".html");
	data
		.toString()
		.replace(/<link.*href=[\'|\"](.*)[\'|\"](.*)>/g, function(toreplace) {
			if (toreplace.indexOf("//") != -1) return toreplace;
			if (toreplace.indexOf("materia.") != -1) return toreplace;
			if (toreplace.indexOf("data-embed='false'") != -1) return toreplace;
			if (toreplace.indexOf('data-embed="false"') != -1) return toreplace;
			assets.push(sourceString + buildLocation + arguments["1"]);
			return "";
		});
	return gulp
		.src(assets)
		.pipe(print())
		.pipe(concat(htmlName + ".css"))
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
}

function minifyJs(htmlName) {
	var assets = [];
	var data = fs.readFileSync(sourceString + buildLocation + htmlName + ".html");
	data
		.toString()
		.replace(/<script.*src=[\'|\"](.*)[\'|\"](.*)>/g, function(toreplace) {
			if (toreplace.indexOf("//") != -1) return toreplace;
			if (toreplace.indexOf("materia.") != -1) return toreplace;
			if (toreplace.indexOf("data-embed='false'") != -1) return toreplace;
			if (toreplace.indexOf('data-embed="false"') != -1) return toreplace;
			assets.push(sourceString + buildLocation + arguments["1"]);
			return "";
		});

	return gulp
		.src(assets)
		.pipe(print())
		.pipe(concat(htmlName + ".js"))
		.pipe(print())
		.pipe(gulp.dest(sourceString + buildLocation));
}

// Removes offending characters from the widget title.
function sanitize(str) {
	if (str) {
		return str.replace(/[^a-zA-Z0-9-_]/g, "");
	} else {
		return "";
	}
}

// Provides rudimentary help documentation from command line.
function showDocs() {
	console.log(
		"\nGulp helps you develop and package HTML widgets for the Materia Platform.\n" +
			"Place your development widget in static/widget/sandbox/myWidget\n\n" +
			"Required:\n" +
			"gulp --widget=widgetdir             Widget name (directory inside static/widget/sandbox/source).\n\n" +
			"Options:\n" +
			"--mangle=false                      Avoids mangle during uglification of js files. mangle=true by default" +
			"--minify=false                      Avoids minification (and embed by nature of minify). minify=true by default" +
			"--embed=false                       Avoids implanting the contents of js and css files into the html. embed=true by default" +
			"Example:\n" +
			"gulp --widget=widgetdir --mangle=false --embed=false"
	);
}

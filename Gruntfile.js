module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("lister.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

    less: {
      development: {
       files: {
          "demo/styles/lister.css": "demo/styles/lister.less"
        }
      },
      production: {
        options: {
          compress: true,
          report: "min",
          sourceMap: true
        },
        files: {
          "demo/styles/lister.css": "demo/styles/lister.less"
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      uglify: {
        files: ['src/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
          debounceDelay: 1000 // Don't call uglify more than once per second
        }
      },
      less: {
        files: ['example/styles/*.less'],
        tasks: ['less:development']
      }
    },


		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.lister.js"],
				dest: "dist/jquery.lister.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.boilerplate.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.lister.js"],
				dest: "dist/jquery.lister.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

	});

  grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");


	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};

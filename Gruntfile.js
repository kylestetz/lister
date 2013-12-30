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
          "styles/lister.css": "styles/lister.less",
        }
      },
      production: {
        options: {
          compress: true,
          report: "min",
          sourceMap: true
        },
        files: {
          "styles/lister.css": "styles/lister.less",
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: ['styles/*.less'],
        tasks: ['less:development']
      }
    },

	});

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask("default", ["watch"]);

};

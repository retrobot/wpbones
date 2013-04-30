'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    livereload: {
        port: 35729, // Default liverreload listening port
    },
    connect: {
      livereload: {
        options: {
	  port: 9001,
	  middleware: function(connect, options) {
	    return [lrSnippet, folderMount(connect, options.base)]
	  }

	}

      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
  	  cssDir: 'css',
	  fontsDir: 'fonts',
	  javascriptDir: 'js',
	  environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },
    regarde: {
      txt: {
        files: '**/*.*',
        tasks: ['livereload']
      }
    },
    imagemin: {
      dist: {
        options: {
	   optimizationLevel: 3
	},
	files: {
	  'dist/img.png': 'src/img.png',
	  'dist/img.jpg': 'src/img.jpg'
	}
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('images', ['imagemin']);
  grunt.registerTask('default', ['compass','livereload-start','connect','regarde']);
};


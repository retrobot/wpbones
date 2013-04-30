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
    regarde: {
      txt: {
        files: '**/*.*',
        tasks: ['livereload']
      }
    }
  });
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start','connect','regarde']);
};


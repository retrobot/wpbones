'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  // Compass settings
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'wp-content/themessass',
          cssDir: 'css'
        }
      }
    },
  // livereload settings
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
    },
  // image minification settings
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
	      },
        files: [{
          expand: true,
          flaten: true,
          cwd: 'hello',
          src: '*.{png,jpg}',
          dest: 'images'//'<%= cwd %>'
        }]
          // {src: 'hello/*.png'}
          // 'dest/fe/': ['hello/*.{png,jpg,jpeg}'],
          // dest: ['*.min.{png,jpg,jpeg}']
          // 'dest/img.png':['src/img.png'],
          // 'dest/img.jpg':['src/img.jpg'],
        
      },
      dev: {
        options: {
	        optimizationLevel: 0
	      },
        files: {
          'dev/img.png': 'src/img.png',
          'dev/img.jpg': 'src/img.jpg'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

//  grunt.registerTask('images', ['imagemin']);
  grunt.registerTask('default', ['compass','livereload-start','connect','regarde']);
};


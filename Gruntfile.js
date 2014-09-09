module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['lib/jquery.payment.js','lib/jquery.npm.payment.js'],
        dest: 'dist/<%= pkg.name%>.js'
      }
    },
    uglify: {
      js: {
        options: {
          sourceMap: true,
          compress: {
            drop_console: true
          }
        },
        files: {
          'dist/<%= pkg.name %>.min.js': [ 'dist/<%= pkg.name %>.js' ]
        }
      }
    },
    watch: {
      files: 'lib/*.js',
      tasks: ['concat','uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat','uglify','watch']);

};

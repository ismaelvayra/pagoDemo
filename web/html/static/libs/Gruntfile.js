module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/bootstrap/transition.js',
            'assets/js/bootstrap/alert.js',
            'assets/js/bootstrap/button.js',
            'assets/js/bootstrap/carousel.js',
            'assets/js/bootstrap/collapse.js',
            'assets/js/bootstrap/dropdown.js',
            'assets/js/bootstrap/modal.js',
            'assets/js/bootstrap/tooltip.js',
            'assets/js/bootstrap/popover.js',
            'assets/js/bootstrap/scrollspy.js',
            'assets/js/bootstrap/tab.js',
            'assets/js/bootstrap/affix.js',
            'assets/js/*.js',
            'assets/js/_*.js'
          ]
        },
      }
    },
    jshint: {
      all: ['Gruntfile.js',
           'assets/js/*.js', 
           '!assets/js/scripts.min.js'
      ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/bootstrap/*.scss'
        ],
        tasks: ['sass'/*, 'version'*/]
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify'/*, 'version'*/]
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php'
        ]
      }
    },

  sass: {
        dist: {
            options: {
                style: 'compressed',
                compass: true,
                sourcemap: true,
            },
            files: {
              'assets/css/main.min.css': [
                'assets/sass/app.scss',
                'assets/sass/bootstrap/*.scss'
              ]
            }
        } 
    },

    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-version');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
    'uglify',
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
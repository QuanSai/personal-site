module.exports = function(grunt) {
  grunt.initConfig({
    // ESLint config - for linting
    eslint: {
      target: ['./app/**/*.js'],
      options: {
        configFile: './config/.eslintrc.json'
          // rulePaths: ['config/rules']
      },
      emitError: true
    },

    // Webpack config
    webpack: {
      options: {
        // configuration for all builds
        entry: "./app/app.js",
        output: {
          filename: "bundle.js"
        },
        stats: {
          // Configure the console output
          colors: true,
          modules: true,
          reasons: true
        },
        module: {
          loaders: [{test: /\.js$/,loader: "eslint-loader",exclude: /node_modules/}]
        }
      },
      build: {
        // configuration for this build
      }
    },

    // Watcher
    watch: {
      all: {
        files: ['app/**/*.js'],
        tasks: []
      }, // end watch:all
      js: {
        files: ['app/**/*.js'],
        tasks: ['webpack']
      } // end watch:js
    }
  });

  // Load Dependencies
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.loadNpmTasks('grunt-contrib-jshint'); // JSHint, but I'm using ESLint instead.

  // Register Tasks
  grunt.registerTask('default', ['webpack']);
  grunt.registerTask('dev', ['watch:js']);
};

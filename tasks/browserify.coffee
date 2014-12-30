gulp = require 'gulp'
browserify = require 'browserify'
source = require 'vinyl-source-stream'

gulp.task 'browserify-demo', ->
  browserify
    entries: ["./demo/demo.coffee"]
    extensions: ['.coffee', '.js']
  .transform 'coffeeify'
  .bundle()
  .pipe source 'demo.js'
  .pipe gulp.dest('demo/')

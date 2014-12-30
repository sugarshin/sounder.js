gulp = require 'gulp'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

NAME = 'sounder'

$ =
  SRC: 'src'
  DEST: 'dest'

gulp.task 'uglify', ->
  gulp.src "#{$.DEST}/#{NAME}.js"
    .pipe uglify(
      preserveComments: 'some'
    )
    .pipe rename(
      extname: '.min.js'
    )
    .pipe gulp.dest("#{$.DEST}")

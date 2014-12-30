gulp = require 'gulp'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
notify = require 'gulp-notify'

NAME = 'sounder'

$ =
  SRC: 'src'
  DEST: 'dest'

gulp.task 'coffee', ->
  gulp.src "#{$.SRC}/#{NAME}.coffee"
    .pipe plumber(
      errorHandler: notify.onError '<%= error.message %>'
    )
    .pipe coffeelint()
    .pipe coffee()
    .pipe gulp.dest("#{$.DEST}")

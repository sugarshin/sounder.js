gulp = require 'gulp'
sequence = require 'gulp-sequence'
requireDir = require 'require-dir'
requireDir './tasks'
browserSync = require 'browser-sync'

reload = browserSync.reload


NAME = 'sounder'

$ =
  SRC: 'src'
  DEST: 'dest'

gulp.task 'serve', ->
  browserSync
    startPath: '/'
    server:
      baseDir: './'
      index: './demo/'
      routes:
        '/': 'demo/'

gulp.task 'watch', ->
  gulp.watch ["#{$.SRC}/#{NAME}.coffee"], ->
    sequence 'coffee', ['header-js', 'header-coffee'], 'browserify-demo', browserSync.reload

gulp.task 'default', ['serve', 'watch']

gulp.task 'build', sequence 'coffee', ['header-js', 'header-coffee'], ['uglify', 'browserify-demo']

gulp.task 'major', sequence 'bump-major', 'coffee', ['header-js', 'header-coffee'], ['uglify', 'browserify-demo']

gulp.task 'minor', sequence 'bump-minor', 'coffee', ['header-js', 'header-coffee'], ['uglify', 'browserify-demo']

gulp.task 'patch', sequence 'bump-patch', 'coffee', ['header-js', 'header-coffee'], ['uglify', 'browserify-demo']

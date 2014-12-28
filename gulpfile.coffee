gulp = require 'gulp'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
notify = require 'gulp-notify'
header = require 'gulp-header'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
bump = require 'gulp-bump'
browserSync = require 'browser-sync'
exec = require('child_process').exec
pkg = require './package.json'

banner = """
/*!
 * @license #{pkg.name} v#{pkg.version}
 * (c) #{new Date().getFullYear()} #{pkg.author} #{pkg.homepage}
 * License: #{pkg.license}
 */

"""

fileName = 'sounder'

gulp.task 'coffee', ->
  gulp.src "src/#{fileName}.coffee"
    .pipe plumber(
      errorHandler: notify.onError '<%= error.message %>'
    )
    .pipe coffeelint()
    .pipe coffee(
      # bare: true
    )
    .pipe header(banner)
    .pipe gulp.dest('dest/')

gulp.task 'browserify', ['coffee'], ->
  browserify
    entries: ['./demo/demo.coffee']
    extensions: ['.coffee', '.js']
  .bundle()
  .pipe source 'demo.js'
  .pipe gulp.dest('demo/')

gulp.task 'serve', ->
  browserSync
    startPath: '/'
    server:
      baseDir: './'
      index: './demo/'
      routes:
        '/': 'demo/'

gulp.task 'default', ['serve'], ->
  gulp.watch ["src/#{fileName}.coffee"], ['browserify', browserSync.reload]

gulp.task 'major', ->
  gulp.src './*.json'
    .pipe bump(
      type: 'major'
    )
    .pipe gulp.dest('./')

gulp.task 'minor', ->
  gulp.src './*.json'
    .pipe bump(
      type: 'minor'
    )
    .pipe gulp.dest('./')

gulp.task 'patch', ->
  gulp.src './*.json'
    .pipe bump(
      type: 'patch'
    )
    .pipe gulp.dest('./')

gulp.task 'build', ['browserify'], ->
  gulp.src "dest/#{fileName}.js"
    .pipe uglify(
      preserveComments: 'some'
    )
    .pipe rename(
      extname: '.min.js'
    )
    .pipe gulp.dest('dest/')

gulp.task 'gh-pages', (cb) ->
  exec 'git subtree push --prefix demo/ origin gh-pages', (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb err

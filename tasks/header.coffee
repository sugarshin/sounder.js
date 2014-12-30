gulp = require 'gulp'
header = require 'gulp-header'
fs = require 'fs'

getPackageJson = -> JSON.parse(fs.readFileSync('./package.json'))

getCoffeeBanner = ->
  pkg = getPackageJson()
  banner = """
  ###!
   * @license #{pkg.name} v#{pkg.version}
   * (c) #{new Date().getFullYear()} #{pkg.author} #{pkg.homepage}
   * License: #{pkg.license}
  ###

  """

getJsBanner = ->
  pkg = getPackageJson()
  banner = """
  /*!
   * @license #{pkg.name} v#{pkg.version}
   * (c) #{new Date().getFullYear()} #{pkg.author} #{pkg.homepage}
   * License: #{pkg.license}
   */

  """



NAME = 'sounder'

$ =
  SRC: 'src'
  DEST: 'dest'

gulp.task 'header-coffee', ->
  gulp.src "#{$.SRC}/#{NAME}.coffee"
    .pipe header(getCoffeeBanner())
    .pipe gulp.dest("#{$.DEST}")

gulp.task 'header-js', ->
  gulp.src "#{$.DEST}/#{NAME}.js"
    .pipe header(getJsBanner())
    .pipe gulp.dest("#{$.DEST}")

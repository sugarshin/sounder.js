gulp = require 'gulp'
exec = require('child_process').exec

gulp.task 'gh-pages', (cb) ->
  exec 'git subtree push --prefix=demo/ origin gh-pages --squash', (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb err

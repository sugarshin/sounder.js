module.exports = (grunt) ->
  grunt.file.defaultEncoding = 'utf8'
  pkg = grunt.file.readJSON 'package.json'

  grunt.initConfig
    copy:
      demo:
        expand: true
        cwd: 'dest/'
        src: [
          '*.js'
          '!.DS_Store'
          '!*.js.map'
        ]
        dest: 'demo/'

    coffee:
      options:
        sourceMap: false
        bare: true
      compile:
        expand: true
        cwd: 'src/'
        src: [
          '*.coffee'
        ]
        dest: 'dest/'
        ext: '.js'

    coffeelint:
      # options:
      #   configFile: 'coffeelint.json'
      lint:
        src: [
          'src/*.coffee'
        ]

    uglify:
      options:
        banner: '/*! ' + pkg.name + ' ' + pkg.version + ' License ' + pkg.license + ' */'
      min:
        expand: true
        cwd: 'dest/'
        src: [
          '*.js'
          '!*.min.js'
        ]
        dest: 'dest/'
        ext: '.min.js'

    notify_hooks:
      options:
        enabled: true
        max_jshint_notifications: 8
        title: 'sounder.coffee'

    watch:
      options:
        livereload: true
        spawn: false
      live:
        files: [
          'src/*.coffee'
        ]
        tasks: [
          'coffeelint:lint'
          'coffee:compile'
        ]

    connect:
      options:
        port: 9003
      live:
        options:
          base: './'

    bumpup:
      files: [
        'package.json'
        'bower.json'
      ]

  for t of pkg.devDependencies
    if t.substring(0, 6) is 'grunt-'
      grunt.loadNpmTasks t



  grunt.registerTask 'l', 'Live reloading.', ->
    grunt.task.run 'connect:live'
    grunt.task.run 'watch:live'
    grunt.task.run 'notify_hooks'
    return

  grunt.registerTask 'u', 'Version update.', (type) ->
    # type >> major minor patch
    grunt.task.run 'bumpup:' + type
    return

  grunt.registerTask 'b', 'Build.', (type) ->
    # type >> major minor patch
    grunt.task.run 'bumpup:' + type
    grunt.task.run 'coffeelint'
    grunt.task.run 'coffee'
    grunt.task.run 'uglify'
    return

  return

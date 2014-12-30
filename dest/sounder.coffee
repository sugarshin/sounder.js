###!
 * @license sounder.js v0.13.0
 * (c) 2014 sugarshin https://github.com/sugarshin
 * License: MIT
###
do (global = (this or 0).self or global) ->
  "use strict"

  class Utility
    extend: (out) ->
      out or= {}
      for i in [1...arguments.length]
        unless arguments[i] then continue
        for own key, val of arguments[i]
          out[key] = val
      return out

    getChildNode: (el) ->
      children = []
      for child in el.children
        children.push child if child.nodeType != 8
      return children

    isArray: do ->
      if Array.isArray
        Array.isArray
      else
        (vArg) ->
          return Object.prototype.toString.call(vArg) is '[object Array]'

    getRandomInt: (min, max) ->
      Math.floor(Math.random() * (max - min + 1)) + min

    requestAnimeFrame: do ->
      if requestAnimationFrame
        (callback) ->
          requestAnimationFrame callback
      else if webkitRequestAnimationFrame
        (callback) ->
          webkitRequestAnimationFrame callback
      else if mozRequestAnimationFrame
        (callback) ->
          mozRequestAnimationFrame callback
      else if msRequestAnimationFrame
        (callback) ->
          msRequestAnimationFrame callback
      else if oRequestAnimationFrame
        (callback) ->
          oRequestAnimationFrame callback
      else
        (callback) ->
          setTimeout callback, 1000 / 60

    cancelAnimeFrame: do ->
      if cancelAnimationFrame
        (id) ->
          cancelAnimationFrame id
      else if webkitCancelAnimationFrame
        (id) ->
          webkitCancelAnimationFrame id
      else if mozCancelAnimationFrame
        (id) ->
          mozCancelAnimationFrame id
      else if msCancelAnimationFrame
        (id) ->
          msCancelAnimationFrame id
      else if oCancelAnimationFrame
        (id) ->
          oCancelAnimationFrame id
      else
        (id) ->
          clearTimeout id

    remove: (el) -> el.parentNode.removeChild el



  class Sounder

    util: new Utility

    # Private method -----------------------------------------
    _init: ->
      wrapper = document.createElement 'div'
      wrapper.className = 'sounder-wrapper'

      colFragment = document.createDocumentFragment()
      for i in [0...@options.column]
        col = document.createElement 'div'
        col.className = 'sounder-col'

        piece = document.createElement 'div'
        piece.className = 'sounder-fragment'
        @_stylingPiece piece

        col.appendChild piece
        colFragment.appendChild col

      wrapper.appendChild colFragment

      @_bars = @util.getChildNode wrapper
      for bar in @_bars
        bar.style.cssText = "
          display: inline-block;
          vertical-align: bottom;
        "

      @_wrapper = wrapper
      @_wrapper.style.cssText = "
        height: #{@options.size[1] * 1.5 * @options.maxHeight}px;
        line-height: #{@options.size[1] * 1.5 * @options.maxHeight}px;
      "

    _animation: ->
      @_isPlaying = true
      start = new Date().getTime()
      do anime = =>
        @_timerID = @util.requestAnimeFrame.call @, anime
        last = new Date().getTime()
        if last - start >= 100 - @options.speed
          @_barsAdjust()
          start = new Date().getTime()

    _stylingPiece: (target) ->
      # IE8でstyle.cssTextによる参照再代入ができないから最初にbackgroundColor定義
      if @util.isArray @options.color
        len = @options.color.length - 1
        backgroundColor = @options.color[@util.getRandomInt(0, len)]
      else
        backgroundColor = @options.color

      # marginは修正するかも
      target.style.cssText = "
        width: #{@options.size[0]}px;
        height: #{@options.size[1]}px;
        margin: 0 1px #{Math.floor(@options.size[1] / 2)}px;
        background: #{backgroundColor};
      "

    _render: (el) -> el.appendChild @_wrapper

    _addFragment: (target) ->
      div = document.createElement 'div'
      div.className = 'sounder-fragment'

      @_stylingPiece div

      target.insertBefore div, target.firstChild

    _rmFragment: (target) ->
      child = @util.getChildNode target
      child[0].parentNode.removeChild child[0]

    _barsAdjust: ->
      for bar in @_bars
        currentLength = @util.getChildNode(bar).length
        if currentLength is 1
          @_addFragment bar
        else if currentLength is @options.maxHeight
          @_rmFragment bar
        else
          [@_addFragment, @_rmFragment][@util.getRandomInt(0, 1)].call @, bar



    constructor: (options) ->
      @options = @util.extend {}, @defaults, options

    defaults:
      size: [20, 4]
      color: '#e74c3c'
      column: 6
      maxHeight: 10
      autoPlay: false
      speed: 60

    create: (output) ->
      @_init()

      @_render output

      if @options.autoPlay is true
        @_animation()
      return this

    play: (callback) ->
      if @_isPlaying isnt true
        @_animation()
        callback?()
      return this

    pause: (callback) ->
      if @_isPlaying is true
        @util.cancelAnimeFrame @_timerID
        @_isPlaying = false
        callback?()
      return this

    toggle: (callbacks...) ->
      if @_isPlaying isnt true
        @play callbacks[0]
      else
        @pause callbacks[1]
      return this

    stop: (callback) ->
      @pause()
      @reset()
      callback?()
      return this

    reset: ->
      for bar in @_bars
        while bar.childNodes[1]
          bar.removeChild bar.firstChild
      return this

    destroy: (callback) ->
      @util.cancelAnimeFrame @_timerID
      if @_timerID? then @_timerID = null
      @util.remove @_wrapper
      callback?()



  isBrowser = 'document' of global

  # Reservation
  # isWebWorkers = 'WorkerLocation' of global
  isNode = 'process' of global

  module?['exports'] = Sounder if isNode or isBrowser
  global['Sounder'] or= Sounder if isBrowser and not module?

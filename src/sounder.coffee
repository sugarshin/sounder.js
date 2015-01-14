do (global = if typeof window isnt 'undefined' then window else this) ->

  class Sounder
    "use strict"

    # Utility ----------------------------------------------
    _extend = (out) ->
      out = out or {}
      for i in [1...arguments.length]
        unless arguments[i] then continue
        for own key, val of arguments[i]
          out[key] = val
      return out

    _getChildNode = (el) ->
      children = []
      for child in el.children
        children.push child if child.nodeType != 8
      return children

    _isArray = do ->
      if Array.isArray
        Array.isArray
      else
        (vArg) ->
          return Object.prototype.toString.call(vArg) is '[object Array]'

    _getRandomInt = (min, max) ->
      Math.floor(Math.random() * (max - min + 1)) + min

    _requestAnimeFrame = do ->
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        (callback) ->
          return window.setTimeout callback, 1000 / 60
      )

    _cancelAnimeFrame = do ->
      return (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        (id) ->
          return window.clearTimeout id
      )

    _remove = (el) -> el.parentNode.removeChild el
    # Utility ----------------------------------------------



    # Private method ---------------------------------------
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

      @_bars = _getChildNode wrapper
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
        @_timerID = _requestAnimeFrame anime
        last = new Date().getTime()
        if last - start >= 100 - @options.speed
          @_barsAdjust()
          start = new Date().getTime()

    _stylingPiece: (target) ->
      # IE8でstyle.cssTextによる参照再代入ができないから最初にbackgroundColor定義
      if _isArray @options.color
        len = @options.color.length - 1
        backgroundColor = @options.color[_getRandomInt(0, len)]
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
      child = _getChildNode target
      child[0].parentNode.removeChild child[0]

    _barsAdjust: ->
      for bar in @_bars
        currentLength = _getChildNode(bar).length
        if currentLength is 1
          @_addFragment bar
        else if currentLength is @options.maxHeight
          @_rmFragment bar
        else
          [@_addFragment, @_rmFragment][_getRandomInt(0, 1)].call @, bar



    constructor: (options) ->
      @options = _extend {}, @_defaults, options

    _defaults:
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
        _cancelAnimeFrame @_timerID
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
      _cancelAnimeFrame @_timerID
      if @_timerID? then @_timerID = null
      _remove @_wrapper
      callback?()



  # UMD
  if typeof define is 'function' and define.amd
    define -> Sounder
  else if typeof module isnt 'undefined' and module.exports
    module.exports = Sounder
  else
    global.Sounder or= Sounder

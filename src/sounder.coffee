class Sounder

  # Helper -------------------------------------------------
  _extend = (out) ->
    out = out or {}
    for i in [1...arguments.length]
      unless arguments[i] then continue
      for key, val of arguments[i]
        if arguments[i].hasOwnProperty key
          out[key] = val
    return out

  _getChildNode = (el) ->
    children = []
    for child in el.children
      children.push child if child.nodeType != 8
    return children

  _isArray = do ->
    if Array.isArray
      return Array.isArray
    else
      return (vArg) ->
        return Object.prototype.toString.call(vArg) is '[object Array]'

  _getRandomInt = (min, max) ->
    return Math.floor(Math.random() * (max - min + 1)) + min

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



  defaults =
    size: [20, 4]
    color: '#e74c3c'
    column: 6
    maxHeight: 10
    autoPlay: false
    speed: 60



  # Private method -----------------------------------------
  init = ->
    wrapper = document.createElement 'div'
    wrapper.className = 'sounder-wrapper'

    colFragment = document.createDocumentFragment()
    for i in [0...@options.column]
      col = document.createElement 'div'
      col.className = 'sounder-col'

      piece = document.createElement 'div'
      piece.className = 'sounder-fragment'
      stylingPiece.call @, piece

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

  animation = ->
    @_isPlaying = true
    start = new Date().getTime()
    do anime = =>
      @_timerID = _requestAnimeFrame anime
      last = new Date().getTime()
      if last - start >= 100 - @options.speed
        barsAdjust.call @
        start = new Date().getTime()

  stylingPiece = (target) ->
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

  render = (el) -> el.appendChild @_wrapper

  addFragment = (target) ->
    div = document.createElement 'div'
    div.className = 'sounder-fragment'

    stylingPiece.call @, div

    target.insertBefore div, target.firstChild

  rmFragment = (target) ->
    child = _getChildNode target
    child[0].parentNode.removeChild child[0]

  barsAdjust = do ->
    doAdjust = []
    doAdjust[0] = addFragment
    doAdjust[1] = rmFragment

    return ->
      for bar in @_bars
        currentLength = _getChildNode(bar).length
        if currentLength is 1
          addFragment.call @, bar
        else if currentLength is @options.maxHeight
          rmFragment.call @, bar
        else
          doAdjust[_getRandomInt(0, 1)].call @, bar



  constructor: (options) ->
    @options = _extend {}, defaults, options



  # Public -------------------------------------------------
  create: (output) ->
    init.call @

    render.call @, output

    if @options.autoPlay is true
      animation.call @
    return this

  play: (callback) ->
    if @_isPlaying isnt true
      animation.call @
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

window.Sounder or= Sounder

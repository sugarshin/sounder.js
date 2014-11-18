###!
Sounder.js
License MIT
###

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
        Object.prototype.toString.call(vArg) is '[object Array]'

  _getRandomInt = (min, max) ->
    return Math.floor(Math.random() * (max - min + 1)) + min



  # Private prop -------------------------------------------
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

    fragment = document.createDocumentFragment()

    for i in [0...@option.column]
      col = document.createElement 'div'
      div = document.createElement 'div'
      div.className = 'fragment'

      # Styling piece
      styling.call @, div

      fragment.appendChild div
      col.className = 'col'
      col.appendChild fragment
      wrapper.appendChild col

    @wrapper = wrapper

    @bars = _getChildNode wrapper

    @wrapper.style.cssText = "
      height: #{@option.size[1] * 1.5 * @option.maxHeight}px;
      line-height: #{@option.size[1] * 1.5 * @option.maxHeight}px;
    "

    for bar in @bars
      bar.style.cssText = "
        display: inline-block;
        vertical-align: bottom;
      "

    return

  animation = ->
    @isPlaying = true
    delay = @option.speed
    do doLoop = =>
      barsAdjust.call @
      @animeTimer = setTimeout doLoop, delay

  styling = (target) ->
    # marginは修正するかも
    target.style.cssText = "
      width: #{@option.size[0]}px;
      height: #{@option.size[1]}px;
      margin: 0 1px #{Math.floor(@option.size[1] / 2)}px;
    "

    if _isArray @option.color
      len = @option.color.length - 1
      target.style.cssText += "
        background: #{@option.color[_getRandomInt(0, len)]}
      "
    else
      target.style.cssText += "
        background: #{@option.color}
      "

  rendering = (output) -> output.appendChild @wrapper

  doAddFragment = (target) ->
    div = document.createElement 'div'
    div.className = 'fragment'

    # Styling piece
    styling.call @, div

    target.insertBefore div, target.firstChild

  doRemoveFragment = (target) ->
    child = _getChildNode target
    child[0].parentNode.removeChild child[0]

  barsAdjust = do ->
    doAdjust = []
    doAdjust[0] = doAddFragment
    doAdjust[1] = doRemoveFragment

    return ->
      for bar in @bars
        currentLength = _getChildNode(bar).length
        if currentLength is 1
          doAddFragment.call @, bar
        else if currentLength is @option.maxHeight
          doRemoveFragment.call @, bar
        else
          doAdjust[_getRandomInt(0, 1)].call @, bar



  constructor: (option) ->
    @option = _extend {}, defaults, option



  # Public -------------------------------------------------
  create: (output) ->
    init.call @

    rendering.call @, output

    if @option.autoPlay is true
      animation.call @
    return this

  play: (callback) ->
    if @isPlaying isnt true
      animation.call @
      callback?()
    return this

  pause: (callback) ->
    if @isPlaying is true
      clearTimeout @animeTimer
      delete @animeTimer
      @isPlaying = false
      callback?()
    return this

  toggle: (callbacks...) ->
    if @isPlaying isnt true
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
    for bar in @bars
      while bar.childNodes[1]
        bar.removeChild bar.firstChild
    return this

window.Sounder or= Sounder

###!
Sounder.js
License MIT
###

class Sounder

  # Helper -------------------------------------------------

  _extend = (out) ->
    out = out or {}

    for i in [1...arguments.length]

      if not arguments[i]
        continue

      for key, val of arguments[i]
        if arguments[i].hasOwnProperty key
          out[key] = val
    return out

  _getChildNode = (el) ->
    children = []
    for child in el.children
      children.push child if child.nodeType != 8
    return children



  # Private prop -------------------------------------------

  defaults =
    size: [20, 4]
    color: '#e74c3c'
    column: 6
    maxHeight: 10
    autoPlay: false
    speed: 60

  tsumikiColor = [
    '#23AAA4'
    '#5AB5B0'
    '#78BEB2'
    '#686F89'
    '#DC5D54'
    '#DD6664'
    '#D94142'
    '#E78E21'
    '#E9A21F'
    '#EDB51C'
  ]



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

    @wrapper.style.height =
      @option.size[1] * 1.5 * @option.maxHeight + 'px'
    @wrapper.style.lineHeight =
      @option.size[1] * 1.5 * @option.maxHeight + 'px'

    for bar in @bars
      bar.style.display = 'inline-block'
      bar.style.verticalAlign = 'bottom'

    return

  animation = ->
    @isPlaying = true
    delay = @option.speed
    do doLoop = =>
      barsAdjust.call @
      @animeTimer = setTimeout doLoop, delay

  styling = (target) ->
    styles = target.style

    styles.width = @option.size[0] + 'px'
    styles.height = @option.size[1] + 'px'
    styles.margin = "0 1px #{Math.floor(@option.size[1] / 2)}px"

    if @option.color is 'tsumiki'
      styles.background = tsumikiColor[Math.floor(Math.random() * 10)]
    else
      styles.background = @option.color

  rendering = (output) -> output.appendChild @wrapper

  barsAdjust = ->
    doAdjust = []

    doAddFragment = (target) =>
      div = document.createElement 'div'
      div.className = 'fragment'

      # Styling piece
      styling.call @, div

      target.insertBefore div, target.firstChild

    doRemoveFragment = (target) ->
      child = _getChildNode target
      child[0].parentNode.removeChild child[0]

    doAdjust[0] = doAddFragment
    doAdjust[1] = doRemoveFragment

    for bar in @bars
      currentLength = _getChildNode(bar).length

      if currentLength is 1
        doAddFragment bar
      else if currentLength is @option.maxHeight
        doRemoveFragment bar
      else
        doAdjust[Math.floor(Math.random() * 2)] bar

    return



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

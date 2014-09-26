###!
sounder.js License MIT
###

class Sounder

  # Static -------------------------------------------------

  this.name = 'Sounder'

  this.getName = ->
    return this.name



  # Helper -------------------------------------------------

  _isType = (type, obj) ->
    clas = Object.prototype.toString.call(obj).slice(8, -1)
    obj isnt undefined and obj isnt null and clas is type

  _deepExtend = (out) ->
    out = out || {}

    for i in [1...arguments.length]
      obj = arguments[i]

      if not obj
        continue

      for key, val of obj
        if obj.hasOwnProperty(key)
          # if typeof val is 'object'
          if _isType 'Object', val
            _deepExtend out[key], val
          else
            out[key] = val
    out

  _getChildNode = (el) ->
    children = []
    for child in el.children
      children.push child if child.nodeType != 8
    children



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

    for i in @bars
      i.style.display = 'inline-block'
      i.style.verticalAlign = 'bottom'

    return

  animation = ->
    _this = @

    @isAnimation = true

    do ->
      delay = _this.option.speed

      loopAnime = ->
        barsAdjust.call _this

        _this.animeTimer = setTimeout loopAnime, delay
        return

      setTimeout loopAnime, delay

      return

    return

  styling = (target) ->
    styles = target.style

    styles.width = @option.size[0] + 'px'
    styles.height = @option.size[1] + 'px'
    styles.margin = '0 1px ' + Math.floor((@option.size[1] / 2)) + 'px'

    if @option.color is 'tsumiki'
      styles.background = tsumikiColor[Math.floor Math.random() * 10]
    else
      styles.background = @option.color
    return

  rendering = (output) ->
    output.appendChild @wrapper

    return

  barsAdjust = ->
    _this = @
    doAdjust = []

    doAddFragment = (target) ->
      div = document.createElement 'div'
      div.className = 'fragment'

      # Styling piece
      styling.call _this, div

      target.insertBefore div, target.firstChild
      return

    doRemoveFragment = (target) ->
      child = _getChildNode target
      child[0].parentNode.removeChild child[0]
      return

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

    @option = _deepExtend {}, defaults, option



  # Public -------------------------------------------------

  create: (output) ->
    init.call @

    rendering.call @, output

    if @option.autoPlay is true
      animation.call @
    @

  play: (callback) ->
    if @isAnimation isnt true
      animation.call @
      if callback? and typeof callback is 'function'
        callback()
    @

  pause: (callback) ->
    if @isAnimation is true
      clearTimeout @animeTimer
      delete @animeTimer
      @isAnimation = false
      if callback? and typeof callback is 'function'
        callback()
    @

  toggle: (callback) ->
    if @isAnimation
      @pause callback
    else
      @play callback
    @

  reset: ->
    for bar in @bars
      while(bar.childNodes[1])
        bar.removeChild bar.firstChild
    @

window.Sounder = window.Sounder || Sounder

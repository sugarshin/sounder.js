###!
sounder.js License MIT
###

class Sounder

  constructor: (option) ->

    defaults =
      size: [20, 4]
      color: '#e74c3c'
      column: 6
      maxHeight: 10
      autoPlay: false
      speed: 60

    # @option = _extend {}, defaults, option

    @option = _deepExtend {}, defaults, option





  # Static prop, method --------------

  this.name = 'Sounder'

  this.getName = ->
    return this.name



  # Private prop ---------------------

  _tsumikiColor = [
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

  _extend = (out) ->
    out = out || {}

    for i in [1...arguments.length]

      if not arguments[i]
        continue

      for key, val of arguments[i]
        if arguments[i].hasOwnProperty(key)
          out[key] = arguments[i][key]
    out

  _shuffle = (array) ->
    random = array.map Math.random
    array.sort (a, b) ->
      return random[a] - random[b]
    return

  _getChildNode = (el) ->
    children = []
    for i in el.children
      children.push i if i.nodeType != 8
    return children



  # Private method ----------------------------------------

  _init = (_this) ->
    opt = _this.option

    _this.wrapper = null if _this.wrapper
    _this.fragment = null if _this.fragment

    wrapper =
      if _this.wrapper then _this.wrapper else document.createElement 'div'

    fragment = document.createDocumentFragment()

    for i in [0...opt.column]
      col = document.createElement 'div'
      div = document.createElement 'div'
      div.className = 'fragment'

      # Styling piece
      _styling _this, div

      fragment.appendChild div
      col.className = 'col'
      col.appendChild fragment
      wrapper.appendChild col

    _this.wrapper = wrapper if !_this.wrapper
    _this.fragment = _getChildNode wrapper

    _this.wrapper.style.height =
      opt.size[1] * 1.5 * opt.maxHeight + 'px'
    _this.wrapper.style.lineHeight =
      opt.size[1] * 1.5 * opt.maxHeight + 'px'

    for i in _this.fragment
      i.style.display = 'inline-block'
      i.style.verticalAlign = 'bottom'

    return

  _animation = (_this) ->

    _this.isAnimation = true

    (() ->
      delay = _this.option.speed

      loopAnime = ->
        _fragmentAdjust _this

        _this.animeTimer = setTimeout loopAnime, delay
        return

      setTimeout loopAnime, delay

      return
    )()

    return

  _styling = (_this, target) ->
    opt = _this.option
    styles = target.style

    styles.width = opt.size[0] + 'px'
    styles.height = opt.size[1] + 'px'
    styles.margin = '0 1px ' + Math.floor((opt.size[1] / 2)) + 'px'

    if opt.color is 'tsumiki'
      styles.background = _tsumikiColor[Math.floor Math.random() * 10]
    else
      styles.background = opt.color
    return

  _rendering = (_this, output) ->
    output.appendChild _this.wrapper

    return

  _fragmentAdjust = (_this) ->
    doAdjust = []

    doAddFragment = (target) ->
      div = document.createElement 'div'
      div.className = 'fragment'

      # Styling piece
      _styling _this, div

      target.insertBefore div, target.firstChild
      return

    doRemoveFragment = (target) ->
      child = _getChildNode target
      child[0].parentNode.removeChild child[0]
      return

    doAdjust[0] = doAddFragment
    doAdjust[1] = doRemoveFragment

    for i in _this.fragment
      currentLength = _getChildNode(i).length

      if currentLength is 1
        doAddFragment i
      else if currentLength is _this.option.maxHeight
        doRemoveFragment i
      else
        doAdjust[Math.floor(Math.random() * 2)] i

    return



  # prototype ------------------------

  create: (output) ->
    _init @

    _rendering @, output

    if @option.autoPlay is true
      _animation @

    @

  play: (callback) ->
    if @isAnimation isnt true
      _animation @
      if callback and typeof callback is 'function'
        callback()
    @

  pause: (callback) ->
    if @isAnimation is true
      clearTimeout @animeTimer
      delete @animeTimer
      @isAnimation = false
      if callback and typeof callback is 'function'
        callback()
    @

  toggle: (callback) ->
    if @isAnimation
      @pause callback
    else
      @play callback
    @

  reset: ->
    for i in @fragment
      while(i.childNodes[1])
        i.removeChild i.firstChild
    @

window.Sounder = window.Sounder || Sounder

return

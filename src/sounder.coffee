###!
sounder.js License MIT
###

((exports) ->

  class Sounder

    constructor: (
      @size = [20, 4]
      @color = '#16a085'
      @row = 6
      @height = 10
      @speed = 60
    ) ->



    # Private prop ----------
    this.name = 'Sounder'

    this.getName = ->
      return this.name



    # Private method -------------------

    getChildNode = (el) ->
      children = []
      for i in [0..(el.children.length - 1)]
        children.unshift el.children[i] if el.children[i].nodeType != 8
      return children

    init = (_this) ->
      _this.wrapper = null if _this.wrapper
      _this.fragment = null if _this.fragment

      wrapper =
        if _this.wrapper then _this.wrapper else document.createElement('div')

      fragment = document.createDocumentFragment()

      for i in [0.._this.row - 1]
        col = document.createElement('div')
        div = document.createElement('div')
        div.className = 'fragment'
        div.style.width = _this.size[0] + 'px'
        div.style.height = _this.size[1] + 'px'
        div.style.margin = '0 1px ' + Math.floor((_this.size[1] / 2)) + 'px'
        div.style.background = _this.color

        fragment.appendChild(div)
        col.className = 'col'
        col.appendChild(fragment)
        wrapper.appendChild(col)

      _this.wrapper = wrapper if !_this.wrapper
      _this.fragment = getChildNode(wrapper)

      return

    styling = (_this) ->
      _this.wrapper.style.overflow = 'hidden'
      _this.wrapper.style.display = 'inline-block'
      _this.wrapper.style.verticalAlign = 'bottom'
      _this.wrapper.style.height =
        _this.size[1] * 1.5 * _this.height + 'px'
      _this.wrapper.style.lineHeight =
        _this.size[1] * 1.5 * _this.height + 'px'

      for i in [0..(_this.fragment.length - 1)]
        _this.fragment[i].style.display = 'inline-block'
        _this.fragment[i].style.verticalAlign = 'bottom'

      return

    rendering = (_this, output) ->
      output.appendChild(_this.wrapper)

      return

    colAdjust = (_this) ->
      doAdjust = []

      doAddCol = (target) ->
        div = document.createElement('div')
        div.className = 'fragment'
        div.style.width = _this.size[0] + 'px'
        div.style.height = _this.size[1] + 'px'
        div.style.margin = '0 1px ' + Math.floor((_this.size[1] / 2)) + 'px'
        div.style.background = _this.color
        target.appendChild(div)
        return

      doRemoveCol = (target) ->
        child = getChildNode target
        child[0].parentNode.removeChild child[0]
        return

      doAdjust[0] = doAddCol
      doAdjust[1] = doRemoveCol

      for i in [0..(_this.fragment.length - 1)]
        currentLength = getChildNode(_this.fragment[i]).length

        if currentLength == 1
          doAddCol(_this.fragment[i])
        else if currentLength == _this.height
          doRemoveCol(_this.fragment[i])
        else
          doAdjust[Math.floor(Math.random() * 2)](_this.fragment[i])

      return



    # prototype ------------------------

    create: (output) ->
      init(@)

      styling(@)

      rendering(@, output)

      return @

    # remove: (el) ->
    #   while el.firstChild
    #     el.removeChild el.firstChild

    #   return @

    anime: ->
      _this = @
      @isAnimation = true

      (()->
        delay = _this.speed

        loopAnime = ->
          colAdjust _this

          _this.animeTimer = setTimeout arguments.callee, delay
          return

        setTimeout loopAnime, delay

        return
      )()

      return @

    start: ->
      @anime() if !@isAnimation
      return

    stop: ->
      clearTimeout @animeTimer
      delete @animeTimer
      @isAnimation = false
      return

    reset: ->
      for i in [0..@fragment.length - 1]
        while(@fragment[i].childNodes[1])
          @fragment[i].removeChild(@fragment[i].firstChild);

      return

  exports.Sounder = exports.Sounder || Sounder

  return
)(this)

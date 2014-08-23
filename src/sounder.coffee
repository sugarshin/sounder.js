###!
sounder.js License MIT
###

((exports) ->

  class Sounder

    # Private method
    getChildNode = (el) ->
      # console.warn el.children[0].nodeType
      children = []
      for i in [0..(el.children.length - 1)]
        children.unshift el.children[i] if el.children[i].nodeType != 8
      return children

    constructor: (
      @size = [20, 4]
      @color = 'green'
      @row = 6
      @height = 10
      @speed
    ) ->

    init = (_this) ->
      wrapper =
        if _this.wrapper then _this.wrapper else document.createElement('div')

      fragment = document.createDocumentFragment()# if !_this.fragment

      # console.log _this.size[0]
      for i in [0.._this.row - 1]
        col = document.createElement('div')
        div = document.createElement('div')
        div.className = 'fragment'
        div.style.width = _this.size[0] + 'px'
        div.style.height = _this.size[1] + 'px'
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

      for i in [0..(_this.fragment.length - 1)]
        _this.fragment[i].style.margin = '0 1px 1px'
        _this.fragment[i].style.display = 'inline-block'

      return

    rendering = (_this, output) ->
      output.appendChild(_this.wrapper)
      _this.wrapper = null
      _this.fragment = null

      return


    # prototype -------------


    create: (output) ->
      init(@)

      styling(@)

      rendering(@, output)

      return @

    remove: (el) ->
      while el.firstChild
        el.removeChild el.firstChild
      # el.parentNode.removeChild el
      return @

    anime: ->
      _this = @
      (()->
        delay = 3000
        setTimeout((->
          console.warn _this
          _this.remove document.getElementById "output"
          _this.size[0] += 1
          _this.size[1] += 1
          # _this.init()
          # _this.styling()
          _this.create document.getElementById "output"

          setTimeout arguments.callee, delay
        ), delay)
        return
      )()
      # console.warn this
      # _this = this
      # delay = 1000
      # setTimeout((->
      #   # console.warn this
      #   _this.size[0] += 1
      #   _this.size[1] += 1
      #   _this.styling()
      #   setTimeout arguments.callee, delay
      # ), delay)

      return this

    start: ->
      console.warn @size
      return

    stop: ->
      console.warn @size
      return



    # private prop ----------
    this.name = 'Sounder'

    this.getName = ->
      return this.name

  exports.Sounder = exports.Sounder || Sounder

  return
)(this)
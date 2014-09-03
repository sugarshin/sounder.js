###!
sounder.js License MIT
###

((exports) ->

  class Sounder

    constructor: (
      @size = [20, 4]
      @color = '#16a085'
      @column = 6
      @height = 10
      @speed = 60
    ) ->



    this.name = 'Sounder'

    this.getName = ->
      return this.name



    # Private prop ----------

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



    # Private method -------------------

    shuffle = (array) ->
      random = array.map Math.random
      array.sort (a, b) ->
        return random[a] - random[b]
      return

    getChildNode = (el) ->
      children = []
      for i in el.children
        children.unshift i if i.nodeType != 8
      return children

    init = (_this) ->
      _this.wrapper = null if _this.wrapper
      _this.fragment = null if _this.fragment

      wrapper =
        if _this.wrapper then _this.wrapper else document.createElement 'div'

      fragment = document.createDocumentFragment()

      for i in [0..._this.column]
        col = document.createElement 'div'
        div = document.createElement 'div'
        div.className = 'fragment'

        # Styling piece
        styling _this, div

        fragment.appendChild div
        col.className = 'col'
        col.appendChild fragment
        wrapper.appendChild col

      _this.wrapper = wrapper if !_this.wrapper
      _this.fragment = getChildNode wrapper

      _this.wrapper.style.height =
        _this.size[1] * 1.5 * _this.height + 'px'
      _this.wrapper.style.lineHeight =
        _this.size[1] * 1.5 * _this.height + 'px'

      for i in _this.fragment
        i.style.display = 'inline-block'
        i.style.verticalAlign = 'bottom'

      return

    styling = (_this, target) ->
      styles = target.style
      styles.width = _this.size[0] + 'px'
      styles.height = _this.size[1] + 'px'
      styles.margin = '0 1px ' + Math.floor((_this.size[1] / 2)) + 'px'
      if _this.color == 'tsumiki'
        styles.background = tsumikiColor[Math.floor Math.random() * 10]
      else
        styles.background = _this.color
      return

    rendering = (_this, output) ->
      output.appendChild _this.wrapper

      return

    fragmentAdjust = (_this) ->
      doAdjust = []

      doAddFragment = (target) ->
        div = document.createElement 'div'
        div.className = 'fragment'

        # Styling piece
        styling _this, div

        target.appendChild div
        return

      doRemoveFragment = (target) ->
        child = getChildNode target
        child[0].parentNode.removeChild child[0]
        return

      doAdjust[0] = doAddFragment
      doAdjust[1] = doRemoveFragment

      for i in _this.fragment
        currentLength = getChildNode(i).length

        if currentLength == 1
          doAddFragment i
        else if currentLength == _this.height
          doRemoveFragment i
        else
          doAdjust[Math.floor(Math.random() * 2)] i

      return



    # prototype ------------------------

    create: (output) ->
      init @

      rendering @, output

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
          fragmentAdjust _this

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

    toggle: ->
      if @isAnimation
        @stop()
      else
        @start()
      return

    reset: ->
      for i in @fragment
        while(i.childNodes[1])
          i.removeChild i.firstChild
      return

  exports.Sounder = exports.Sounder || Sounder

  return
)(this)

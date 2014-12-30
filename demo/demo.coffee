Sounder = require '../src/sounder.coffee'

_addEvent = (el, type, func) ->
  if el.addEventListener
    el.addEventListener type, func, false
  else el.attachEvent "on" + type, func  if el.attachEvent
  return

sounder = new Sounder
  size: [16, 4]
  color: '#23AAA4'
  column: 11
  maxHeight: 10
  autoPlay: true

output = document.getElementById 'output'
sounder.create output

play = document.getElementById 'play'
pause = document.getElementById 'pause'
stop = document.getElementById 'stop'
toggle = document.getElementById 'toggle'

_addEvent play, 'click', ->
  sounder.play ->
    console.log 'Played!!'

_addEvent pause, 'click', ->
  sounder.pause ->
    console.log 'Paused!!'

_addEvent toggle, 'click', ->
  sounder.toggle(
    -> console.log 'Toggle for play!!'
    -> console.log 'Toggle for pause!!'
  )

_addEvent stop, 'click', ->
  sounder.stop ->
    console.log 'Stopped!!'

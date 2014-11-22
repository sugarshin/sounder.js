# Sounder.js

Sound effector small JavaScript library.

## Demo

[https://sugarshin.github.io/sounder.js/demo/](https://sugarshin.github.io/sounder.js/demo/)

## Quickstart

```shell
bower install sounder.js
```

## Usage

```javascript
var sounder = new Sounder(),
    output = document.getElementById('output');

sounder.create(output);
```

### Config

**`Sounder([ options ]);`**

#### options.size

Piece size

Type: *Array*

Default: `[20, 4]`

#### options.color

Coloring

If specify Array, will be chosen at random

Type: *String or Array*

Default: `'#e74c3c'`

#### options.column

Effect column length

Type: *Number*

Default: `6`

#### options.maxHeight

Effect max height length

Type: *Number*

Default: `10`

#### options.autoPlay

Effect auto playing

Type: *Boolean*

Default: `false`

#### options.speed

Effect animation speed

Type: *Number*

Default: `60`

## Methods

### `.create( DOMElement )`

Create and redering.

**DOMElement**

Type: *Element*

**Returns:** `this`

### `.play( [callback] )`

Play.

**Returns:** `this`

### `.pause( [callback] )`

Pause.

**Returns:** `this`

### `.toggle( [callback, callback] )`

Toggles the state between play and pause.

Function of the first argument is the callback function for play. next is pause.

**Returns:** `this`

### `.stop( [callback] )`

Stop.

**Returns:** `this`

### `.reset()`

Effect counter reset.

**Returns:** `this`

## Contributing

This library was developed with following things

[gulp](http://gulpjs.com/)

[CoffeeScript](http://coffeescript.org/)

```shell
npm i
```

### `gulp`

Default gulp task

CoffeeScript compile, Live reloading

### `gulp patch`

Patch

`package.json`, `bower.json` version property update.

### `gulp minor`

Minor update

`package.json`, `bower.json` version property update.

### `gulp major`

Major update

`package.json`, `bower.json` version property update.

### `gulp build`

Build

## Support browser

Modern browser and IE8+

## License

MIT

© sugarshin

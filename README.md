```
 ____                                __
/\  _`\                             /\ \                    __
\ \,\L\_\    ___   __  __    ___    \_\ \     __   _ __    /\_\    ____  
 \/_\__ \   / __`\/\ \/\ \ /' _ `\  /'_` \  /'__`\/\`'__\  \/\ \  /',__\
   /\ \L\ \/\ \L\ \ \ \_\ \/\ \/\ \/\ \L\ \/\  __/\ \ \/ __ \ \ \/\__, `\
   \ `\____\ \____/\ \____/\ \_\ \_\ \___,_\ \____\\ \_\/\_\_\ \ \/\____/
    \/_____/\/___/  \/___/  \/_/\/_/\/__,_ /\/____/ \/_/\/_/\ \_\ \/___/
                                                           \ \____/
                                                            \/___/
```

Sound effector small JavaScript library.

## Demo

[https://sugarshin.github.io/sounder.js/](//sugarshin.github.io/sounder.js/)

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

fps

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

### `.destory()`

Destory.

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

# Sounder.js

Sound effector small JavaScript library.

v0.6.2

## Demo

[https://tsumikiinc.github.io/sounder.js/demo/](https://tsumikiinc.github.io/sounder.js/demo/)

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

### Parameter

**`Sounder([ option ]);`**

#### option.size

Piece size

Type: *Array*

Default: `[20, 4]`

#### option.color

Coloring

Support `'tsumiki'` coloring.

Type: *String*

Default: `'#e74c3c'`

#### option.column

Effect column length

Type: *Number*

Default: `6`

#### option.maxHeight

Effect max height length

Type: *Number*

Default: `10`

#### option.autoPlay

Effect auto playing

Type: *Boolean*

Default: `false`

#### option.speed

Effect animation speed

Type: *Number*

Default: `60`

## Methods

### `.create( DOMElement )`

Create and redering.

#### DOMElement

Type: *Element*

**Returns:** `this`

### `.play( [callback] )`

Animation play.

**Returns:** `this`

### `.pause( [callback] )`

Animation pause.

**Returns:** `this`

### `.toggle( [callback] )`

Toggles the state between play and pause.

**Returns:** `this`

### `.reset()`

Effector reset.

**Returns:** `this`

## Contributing

Using Grunt

```shell
npm i
```

### `grunt l`

Live reload.

#### Tasks

* `connect`
* `watch`
* `notify_hooks`

##### `watch` tasks

* `coffeelint`
* `coffee`

### `grunt u`

`package.json`, `bower.json` version property update.

#### Parameter

* `grunt u:major` // Major version up
* `grunt u:minor` // Minor version up
* `grunt u:patch` // Patch

#### Tasks

* `bumpup`

### `grunt b`

Build.

#### Tasks

* `coffeelint`
* `coffee`
* `uglify`

## Support browser

Modern browser and IE8+

## License

MIT

© Tsumiki inc.

© sugarshin

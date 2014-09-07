# Sounder.js

Sound effector small JavaScript library.

v0.3.0

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

**`Sounder([size, color, column, maxHeight]);`**

**size**

Piece size

Type: *Array*

Default: *[20, 4]*

**color**

Coloring

Support `'tsumiki'` coloring.

Type: *String*

Default: *'#e74c3c'*

**column**

Effect column length

Type: *Number*

Default: *6*

**maxHeight**

Effect max height length

Type: *Number*

Default: *10*

## Methods

### `.create( element [, animationOption ] )`

Create and animation setting.

**element**

Type: *Element*

**animationOption**

Type: *Object*

Default:

```javascript
{
  autoPlay: false,
  speed: 50
}
```

**Returns:** `this`

### `.start()`

Animation start.

### `.stop()`

Animation stop.

### `.toggle()`

Toggles the state between start and stop.

### `.reset()`

Effector reset.

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
* `copy`

### `grunt b`

Build.

#### Parameter

* `grunt b:major` // Major version up
* `grunt b:minor` // Minor version up
* `grunt b:patch` // Patch

#### Tasks

* `bumpup`
* `copy`
* `coffeelint`
* `coffee`
* `uglify`

### `grunt u`

`package.json` version update.

#### Parameter

* `grunt u:major` // Major version up
* `grunt u:minor` // Minor version up
* `grunt u:patch` // Patch

#### Tasks

* `bumpup` only

## License

MIT

© Tsumiki inc.

© sugarshin

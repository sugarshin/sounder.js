# Sounder.js

Sound effector JavaScript library.

## Demo

[https://tsumikiinc.github.io/sounder.js/demo/](https://tsumikiinc.github.io/sounder.js/demo/)

## Usage

```javascript
var soundEffect = new Sounder(
  [16, 4],
  '#16a085',
  8,
  10,
  50
);

soundEffect.create(document.getElementById('output'));
```
### Parameter

**`Sounder([size, color, row, height, speed]);`**

**size**

Size

Type: *Array*

**color**

Color

Type: *String*

**row**

Effect row length

Type: *Number*

**height**

Effect height length

Type: *Number*

**speed**

Effect speed

Type: *Number*

## Methods

### `.create( element )`

Rendering.

**element**

Type: *Element*

**Returns:** `this`

### `.anime()`

Effect animation.

**Returns:** `this`

### `.start()`

Animation start.

### `.stop()`

Animation stop.

### `.reset()`

Effector reset.

## Build

Use Grunt

### `grunt l`

Live reload.

#### Tasks

* `connect`
* `watch`
* `notify_hooks`

##### `watch` taks

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

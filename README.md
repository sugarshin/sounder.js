# Sounder.js

Sound effector small JavaScript library.

v0.2.1

## Demo

[https://tsumikiinc.github.io/sounder.js/demo/](https://tsumikiinc.github.io/sounder.js/demo/)

## Usage

```javascript
var soundEffect = new Sounder();

soundEffect.create(document.getElementById('output'));
```
### Parameter

**`Sounder([size, color, column, height, speed]);`**

**size**

Size

Type: *Array*

Default: *[20, 4]*

**color**

Color

Support `'tsumiki'` coloring.

Type: *String*

Default: *'#16a085'*

**column**

Effect column length

Type: *Number*

Default: *6*

**height**

Effect max height length

Type: *Number*

Default: *10*

**speed**

Effect speed

Type: *Number*

Default: *60*

## Methods

### `.create( element )`

Create and Rendering.

**element**

Type: *Element*

**Returns:** `this`

### `.anime()`

Animation.

**Returns:** `this`

### `.start()`

Animation start.

### `.stop()`

Animation stop.

### `.toggle()`

Toggles the state between start and stop.

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

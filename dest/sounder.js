
/*!
Sounder.js
License MIT
 */

(function() {
  var Sounder,
    __slice = [].slice;

  Sounder = (function() {
    var animation, barsAdjust, defaults, doAddFragment, doRemoveFragment, init, rendering, styling, _cancelAnimeFrame, _extend, _getChildNode, _getRandomInt, _isArray, _requestAnimeFrame;

    _extend = function(out) {
      var i, key, val, _i, _ref, _ref1;
      out = out || {};
      for (i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        if (!arguments[i]) {
          continue;
        }
        _ref1 = arguments[i];
        for (key in _ref1) {
          val = _ref1[key];
          if (arguments[i].hasOwnProperty(key)) {
            out[key] = val;
          }
        }
      }
      return out;
    };

    _getChildNode = function(el) {
      var child, children, _i, _len, _ref;
      children = [];
      _ref = el.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType !== 8) {
          children.push(child);
        }
      }
      return children;
    };

    _isArray = (function() {
      if (Array.isArray) {
        return Array.isArray;
      } else {
        return function(vArg) {
          return Object.prototype.toString.call(vArg) === '[object Array]';
        };
      }
    })();

    _getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    _requestAnimeFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();

    _cancelAnimeFrame = (function() {
      return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(id) {
        return window.clearTimeout(id);
      };
    })();

    defaults = {
      size: [20, 4],
      color: '#e74c3c',
      column: 6,
      maxHeight: 10,
      autoPlay: false,
      speed: 60
    };

    init = function() {
      var bar, col, div, fragment, i, wrapper, _i, _j, _len, _ref, _ref1;
      wrapper = document.createElement('div');
      fragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = this.option.column; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        col = document.createElement('div');
        div = document.createElement('div');
        div.className = 'fragment';
        styling.call(this, div);
        fragment.appendChild(div);
        col.className = 'col';
        col.appendChild(fragment);
        wrapper.appendChild(col);
      }
      this.wrapper = wrapper;
      this.bars = _getChildNode(wrapper);
      this.wrapper.style.cssText = "height: " + (this.option.size[1] * 1.5 * this.option.maxHeight) + "px; line-height: " + (this.option.size[1] * 1.5 * this.option.maxHeight) + "px;";
      _ref1 = this.bars;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        bar = _ref1[_j];
        bar.style.cssText = "display: inline-block; vertical-align: bottom;";
      }
    };

    animation = function() {
      var anime, start;
      this.isPlaying = true;
      start = new Date().getTime();
      return (anime = (function(_this) {
        return function() {
          var last;
          _this.animeTimer = _requestAnimeFrame(anime);
          last = new Date().getTime();
          if (last - start >= 100 - _this.option.speed) {
            barsAdjust.call(_this);
            return start = new Date().getTime();
          }
        };
      })(this))();
    };

    styling = function(target) {
      var backgroundColor, len;
      if (_isArray(this.option.color)) {
        len = this.option.color.length - 1;
        backgroundColor = this.option.color[_getRandomInt(0, len)];
      } else {
        backgroundColor = this.option.color;
      }
      return target.style.cssText = "width: " + this.option.size[0] + "px; height: " + this.option.size[1] + "px; margin: 0 1px " + (Math.floor(this.option.size[1] / 2)) + "px; background: " + backgroundColor;
    };

    rendering = function(output) {
      return output.appendChild(this.wrapper);
    };

    doAddFragment = function(target) {
      var div;
      div = document.createElement('div');
      div.className = 'fragment';
      styling.call(this, div);
      return target.insertBefore(div, target.firstChild);
    };

    doRemoveFragment = function(target) {
      var child;
      child = _getChildNode(target);
      return child[0].parentNode.removeChild(child[0]);
    };

    barsAdjust = (function() {
      var doAdjust;
      doAdjust = [];
      doAdjust[0] = doAddFragment;
      doAdjust[1] = doRemoveFragment;
      return function() {
        var bar, currentLength, _i, _len, _ref, _results;
        _ref = this.bars;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bar = _ref[_i];
          currentLength = _getChildNode(bar).length;
          if (currentLength === 1) {
            _results.push(doAddFragment.call(this, bar));
          } else if (currentLength === this.option.maxHeight) {
            _results.push(doRemoveFragment.call(this, bar));
          } else {
            _results.push(doAdjust[_getRandomInt(0, 1)].call(this, bar));
          }
        }
        return _results;
      };
    })();

    function Sounder(option) {
      this.option = _extend({}, defaults, option);
    }

    Sounder.prototype.create = function(output) {
      init.call(this);
      rendering.call(this, output);
      if (this.option.autoPlay === true) {
        animation.call(this);
      }
      return this;
    };

    Sounder.prototype.play = function(callback) {
      if (this.isPlaying !== true) {
        animation.call(this);
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.pause = function(callback) {
      if (this.isPlaying === true) {
        _cancelAnimeFrame(this.animeTimer);
        this.isPlaying = false;
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.toggle = function() {
      var callbacks;
      callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.isPlaying !== true) {
        this.play(callbacks[0]);
      } else {
        this.pause(callbacks[1]);
      }
      return this;
    };

    Sounder.prototype.stop = function(callback) {
      this.pause();
      this.reset();
      if (typeof callback === "function") {
        callback();
      }
      return this;
    };

    Sounder.prototype.reset = function() {
      var bar, _i, _len, _ref;
      _ref = this.bars;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        while (bar.childNodes[1]) {
          bar.removeChild(bar.firstChild);
        }
      }
      return this;
    };

    return Sounder;

  })();

  window.Sounder || (window.Sounder = Sounder);

}).call(this);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Sounder, output, pause, play, sounder, stop, toggle, _addEvent;

Sounder = require('../src/sounder.coffee');

_addEvent = function(el, type, func) {
  if (el.addEventListener) {
    el.addEventListener(type, func, false);
  } else {
    if (el.attachEvent) {
      el.attachEvent("on" + type, func);
    }
  }
};

sounder = new Sounder({
  size: [16, 4],
  color: '#23AAA4',
  column: 11,
  maxHeight: 10,
  autoPlay: true
});

output = document.getElementById('output');

sounder.create(output);

play = document.getElementById('play');

pause = document.getElementById('pause');

stop = document.getElementById('stop');

toggle = document.getElementById('toggle');

_addEvent(play, 'click', function() {
  return sounder.play(function() {
    return console.log('Played!!');
  });
});

_addEvent(pause, 'click', function() {
  return sounder.pause(function() {
    return console.log('Paused!!');
  });
});

_addEvent(toggle, 'click', function() {
  return sounder.toggle(function() {
    return console.log('Toggle for play!!');
  }, function() {
    return console.log('Toggle for pause!!');
  });
});

_addEvent(stop, 'click', function() {
  return sounder.stop(function() {
    return console.log('Stopped!!');
  });
});



},{"../src/sounder.coffee":2}],2:[function(require,module,exports){
(function (global){
var __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

(function(global) {
  "use strict";
  var Sounder, Utility, isBrowser, isNode;
  Utility = (function() {
    function Utility() {}

    Utility.prototype.extend = function(out) {
      var i, key, val, _i, _ref, _ref1;
      out || (out = {});
      for (i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        if (!arguments[i]) {
          continue;
        }
        _ref1 = arguments[i];
        for (key in _ref1) {
          if (!__hasProp.call(_ref1, key)) continue;
          val = _ref1[key];
          out[key] = val;
        }
      }
      return out;
    };

    Utility.prototype.getChildNode = function(el) {
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

    Utility.prototype.isArray = (function() {
      if (Array.isArray) {
        return Array.isArray;
      } else {
        return function(vArg) {
          return Object.prototype.toString.call(vArg) === '[object Array]';
        };
      }
    })();

    Utility.prototype.getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    Utility.prototype.requestAnimeFrame = (function() {
      if (requestAnimationFrame) {
        return function(callback) {
          return requestAnimationFrame(callback);
        };
      } else if (webkitRequestAnimationFrame) {
        return function(callback) {
          return webkitRequestAnimationFrame(callback);
        };
      } else if (mozRequestAnimationFrame) {
        return function(callback) {
          return mozRequestAnimationFrame(callback);
        };
      } else if (msRequestAnimationFrame) {
        return function(callback) {
          return msRequestAnimationFrame(callback);
        };
      } else if (oRequestAnimationFrame) {
        return function(callback) {
          return oRequestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return setTimeout(callback, 1000 / 60);
        };
      }
    })();

    Utility.prototype.cancelAnimeFrame = (function() {
      if (cancelAnimationFrame) {
        return function(id) {
          return cancelAnimationFrame(id);
        };
      } else if (webkitCancelAnimationFrame) {
        return function(id) {
          return webkitCancelAnimationFrame(id);
        };
      } else if (mozCancelAnimationFrame) {
        return function(id) {
          return mozCancelAnimationFrame(id);
        };
      } else if (msCancelAnimationFrame) {
        return function(id) {
          return msCancelAnimationFrame(id);
        };
      } else if (oCancelAnimationFrame) {
        return function(id) {
          return oCancelAnimationFrame(id);
        };
      } else {
        return function(id) {
          return clearTimeout(id);
        };
      }
    })();

    Utility.prototype.remove = function(el) {
      return el.parentNode.removeChild(el);
    };

    return Utility;

  })();
  Sounder = (function() {
    Sounder.prototype.util = new Utility;

    Sounder.prototype._init = function() {
      var bar, col, colFragment, i, piece, wrapper, _i, _j, _len, _ref, _ref1;
      wrapper = document.createElement('div');
      wrapper.className = 'sounder-wrapper';
      colFragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = this.options.column; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        col = document.createElement('div');
        col.className = 'sounder-col';
        piece = document.createElement('div');
        piece.className = 'sounder-fragment';
        this._stylingPiece(piece);
        col.appendChild(piece);
        colFragment.appendChild(col);
      }
      wrapper.appendChild(colFragment);
      this._bars = this.util.getChildNode(wrapper);
      _ref1 = this._bars;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        bar = _ref1[_j];
        bar.style.cssText = "display: inline-block; vertical-align: bottom;";
      }
      this._wrapper = wrapper;
      return this._wrapper.style.cssText = "height: " + (this.options.size[1] * 1.5 * this.options.maxHeight) + "px; line-height: " + (this.options.size[1] * 1.5 * this.options.maxHeight) + "px;";
    };

    Sounder.prototype._animation = function() {
      var anime, start;
      this._isPlaying = true;
      start = new Date().getTime();
      return (anime = (function(_this) {
        return function() {
          var last;
          _this._timerID = _this.util.requestAnimeFrame.call(_this, anime);
          last = new Date().getTime();
          if (last - start >= 100 - _this.options.speed) {
            _this._barsAdjust();
            return start = new Date().getTime();
          }
        };
      })(this))();
    };

    Sounder.prototype._stylingPiece = function(target) {
      var backgroundColor, len;
      if (this.util.isArray(this.options.color)) {
        len = this.options.color.length - 1;
        backgroundColor = this.options.color[this.util.getRandomInt(0, len)];
      } else {
        backgroundColor = this.options.color;
      }
      return target.style.cssText = "width: " + this.options.size[0] + "px; height: " + this.options.size[1] + "px; margin: 0 1px " + (Math.floor(this.options.size[1] / 2)) + "px; background: " + backgroundColor + ";";
    };

    Sounder.prototype._render = function(el) {
      return el.appendChild(this._wrapper);
    };

    Sounder.prototype._addFragment = function(target) {
      var div;
      div = document.createElement('div');
      div.className = 'sounder-fragment';
      this._stylingPiece(div);
      return target.insertBefore(div, target.firstChild);
    };

    Sounder.prototype._rmFragment = function(target) {
      var child;
      child = this.util.getChildNode(target);
      return child[0].parentNode.removeChild(child[0]);
    };

    Sounder.prototype._barsAdjust = function() {
      var bar, currentLength, _i, _len, _ref, _results;
      _ref = this._bars;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        currentLength = this.util.getChildNode(bar).length;
        if (currentLength === 1) {
          _results.push(this._addFragment(bar));
        } else if (currentLength === this.options.maxHeight) {
          _results.push(this._rmFragment(bar));
        } else {
          _results.push([this._addFragment, this._rmFragment][this.util.getRandomInt(0, 1)].call(this, bar));
        }
      }
      return _results;
    };

    function Sounder(options) {
      this.options = this.util.extend({}, this.defaults, options);
    }

    Sounder.prototype.defaults = {
      size: [20, 4],
      color: '#e74c3c',
      column: 6,
      maxHeight: 10,
      autoPlay: false,
      speed: 60
    };

    Sounder.prototype.create = function(output) {
      this._init();
      this._render(output);
      if (this.options.autoPlay === true) {
        this._animation();
      }
      return this;
    };

    Sounder.prototype.play = function(callback) {
      if (this._isPlaying !== true) {
        this._animation();
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.pause = function(callback) {
      if (this._isPlaying === true) {
        this.util.cancelAnimeFrame(this._timerID);
        this._isPlaying = false;
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.toggle = function() {
      var callbacks;
      callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._isPlaying !== true) {
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
      _ref = this._bars;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        while (bar.childNodes[1]) {
          bar.removeChild(bar.firstChild);
        }
      }
      return this;
    };

    Sounder.prototype.destroy = function(callback) {
      this.util.cancelAnimeFrame(this._timerID);
      if (this._timerID != null) {
        this._timerID = null;
      }
      this.util.remove(this._wrapper);
      return typeof callback === "function" ? callback() : void 0;
    };

    return Sounder;

  })();
  isBrowser = 'document' in global;
  isNode = 'process' in global;
  if (isNode || isBrowser) {
    if (typeof module !== "undefined" && module !== null) {
      module['exports'] = Sounder;
    }
  }
  if (isBrowser && (typeof module === "undefined" || module === null)) {
    return global['Sounder'] || (global['Sounder'] = Sounder);
  }
})((this || 0).self || global);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);

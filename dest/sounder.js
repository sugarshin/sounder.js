/*!
 * @license sounder.js v0.12.0
 * (c) 2014 sugarshin https://github.com/sugarshin
 * License: MIT
 */
var __slice = [].slice;

(function(global) {
  "use strict";
  var Sounder;
  Sounder = (function() {
    var addFragment, animation, barsAdjust, init, render, rmFragment, stylingPiece, _cancelAnimeFrame, _extend, _getChildNode, _getRandomInt, _isArray, _remove, _requestAnimeFrame;

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
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();

    _cancelAnimeFrame = (function() {
      return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {
        return window.clearTimeout(id);
      };
    })();

    _remove = function(el) {
      return el.parentNode.removeChild(el);
    };

    init = function() {
      var bar, col, colFragment, i, piece, wrapper, _i, _j, _len, _ref, _ref1;
      wrapper = document.createElement('div');
      wrapper.className = 'sounder-wrapper';
      colFragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = this.options.column; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        col = document.createElement('div');
        col.className = 'sounder-col';
        piece = document.createElement('div');
        piece.className = 'sounder-fragment';
        stylingPiece.call(this, piece);
        col.appendChild(piece);
        colFragment.appendChild(col);
      }
      wrapper.appendChild(colFragment);
      this._bars = _getChildNode(wrapper);
      _ref1 = this._bars;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        bar = _ref1[_j];
        bar.style.cssText = "display: inline-block; vertical-align: bottom;";
      }
      this._wrapper = wrapper;
      return this._wrapper.style.cssText = "height: " + (this.options.size[1] * 1.5 * this.options.maxHeight) + "px; line-height: " + (this.options.size[1] * 1.5 * this.options.maxHeight) + "px;";
    };

    animation = function() {
      var anime, start;
      this._isPlaying = true;
      start = new Date().getTime();
      return (anime = (function(_this) {
        return function() {
          var last;
          _this._timerID = _requestAnimeFrame(anime);
          last = new Date().getTime();
          if (last - start >= 100 - _this.options.speed) {
            barsAdjust.call(_this);
            return start = new Date().getTime();
          }
        };
      })(this))();
    };

    stylingPiece = function(target) {
      var backgroundColor, len;
      if (_isArray(this.options.color)) {
        len = this.options.color.length - 1;
        backgroundColor = this.options.color[_getRandomInt(0, len)];
      } else {
        backgroundColor = this.options.color;
      }
      return target.style.cssText = "width: " + this.options.size[0] + "px; height: " + this.options.size[1] + "px; margin: 0 1px " + (Math.floor(this.options.size[1] / 2)) + "px; background: " + backgroundColor + ";";
    };

    render = function(el) {
      return el.appendChild(this._wrapper);
    };

    addFragment = function(target) {
      var div;
      div = document.createElement('div');
      div.className = 'sounder-fragment';
      stylingPiece.call(this, div);
      return target.insertBefore(div, target.firstChild);
    };

    rmFragment = function(target) {
      var child;
      child = _getChildNode(target);
      return child[0].parentNode.removeChild(child[0]);
    };

    barsAdjust = (function() {
      var doAdjust;
      doAdjust = [];
      doAdjust[0] = addFragment;
      doAdjust[1] = rmFragment;
      return function() {
        var bar, currentLength, _i, _len, _ref, _results;
        _ref = this._bars;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bar = _ref[_i];
          currentLength = _getChildNode(bar).length;
          if (currentLength === 1) {
            _results.push(addFragment.call(this, bar));
          } else if (currentLength === this.options.maxHeight) {
            _results.push(rmFragment.call(this, bar));
          } else {
            _results.push(doAdjust[_getRandomInt(0, 1)].call(this, bar));
          }
        }
        return _results;
      };
    })();

    function Sounder(options) {
      this.options = _extend({}, this.defaults, options);
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
      init.call(this);
      render.call(this, output);
      if (this.options.autoPlay === true) {
        animation.call(this);
      }
      return this;
    };

    Sounder.prototype.play = function(callback) {
      if (this._isPlaying !== true) {
        animation.call(this);
        if (typeof callback === "function") {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.pause = function(callback) {
      if (this._isPlaying === true) {
        _cancelAnimeFrame(this._timerID);
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
      _cancelAnimeFrame(this._timerID);
      if (this._timerID != null) {
        this._timerID = null;
      }
      _remove(this._wrapper);
      return typeof callback === "function" ? callback() : void 0;
    };

    return Sounder;

  })();
  module.exports = Sounder;
  return global['Sounder'] || (global['Sounder'] = Sounder);
})((this || 0).self || global);

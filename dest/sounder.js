
/*!
sounder.js License MIT
 */

(function() {
  var Sounder;

  Sounder = (function() {
    var animation, barsAdjust, init, rendering, styling, tsumikiColor, _deepExtend, _getChildNode, _isType;

    function Sounder(option) {
      var defaults;
      defaults = {
        size: [20, 4],
        color: '#e74c3c',
        column: 6,
        maxHeight: 10,
        autoPlay: false,
        speed: 60
      };
      this.option = _deepExtend({}, defaults, option);
    }

    Sounder.name = 'Sounder';

    Sounder.getName = function() {
      return this.name;
    };

    tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];

    _isType = function(type, obj) {
      var clas;
      clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== void 0 && obj !== null && clas === type;
    };

    _deepExtend = function(out) {
      var i, key, obj, val, _i, _ref;
      out = out || {};
      for (i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        obj = arguments[i];
        if (!obj) {
          continue;
        }
        for (key in obj) {
          val = obj[key];
          if (obj.hasOwnProperty(key)) {
            if (_isType('Object', val)) {
              _deepExtend(out[key], val);
            } else {
              out[key] = val;
            }
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

    init = function() {
      var col, div, fragment, i, wrapper, _i, _j, _len, _ref, _ref1;
      if (this.wrapper) {
        this.wrapper = null;
      }
      if (this.bars) {
        this.bars = null;
      }
      wrapper = this.wrapper ? this.wrapper : document.createElement('div');
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
      if (!this.wrapper) {
        this.wrapper = wrapper;
      }
      this.bars = _getChildNode(wrapper);
      this.wrapper.style.height = this.option.size[1] * 1.5 * this.option.maxHeight + 'px';
      this.wrapper.style.lineHeight = this.option.size[1] * 1.5 * this.option.maxHeight + 'px';
      _ref1 = this.bars;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        i = _ref1[_j];
        i.style.display = 'inline-block';
        i.style.verticalAlign = 'bottom';
      }
    };

    animation = function() {
      var _this;
      _this = this;
      this.isAnimation = true;
      (function() {
        var delay, loopAnime;
        delay = _this.option.speed;
        loopAnime = function() {
          barsAdjust.call(_this);
          _this.animeTimer = setTimeout(loopAnime, delay);
        };
        setTimeout(loopAnime, delay);
      })();
    };

    styling = function(target) {
      var styles;
      styles = target.style;
      styles.width = this.option.size[0] + 'px';
      styles.height = this.option.size[1] + 'px';
      styles.margin = '0 1px ' + Math.floor(this.option.size[1] / 2) + 'px';
      if (this.option.color === 'tsumiki') {
        styles.background = tsumikiColor[Math.floor(Math.random() * 10)];
      } else {
        styles.background = this.option.color;
      }
    };

    rendering = function(output) {
      output.appendChild(this.wrapper);
    };

    barsAdjust = function() {
      var bar, currentLength, doAddFragment, doAdjust, doRemoveFragment, _i, _len, _ref, _this;
      _this = this;
      doAdjust = [];
      doAddFragment = function(target) {
        var div;
        div = document.createElement('div');
        div.className = 'fragment';
        styling.call(_this, div);
        target.insertBefore(div, target.firstChild);
      };
      doRemoveFragment = function(target) {
        var child;
        child = _getChildNode(target);
        child[0].parentNode.removeChild(child[0]);
      };
      doAdjust[0] = doAddFragment;
      doAdjust[1] = doRemoveFragment;
      _ref = this.bars;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        currentLength = _getChildNode(bar).length;
        if (currentLength === 1) {
          doAddFragment(bar);
        } else if (currentLength === this.option.maxHeight) {
          doRemoveFragment(bar);
        } else {
          doAdjust[Math.floor(Math.random() * 2)](bar);
        }
      }
    };

    Sounder.prototype.create = function(output) {
      init.call(this);
      rendering.call(this, output);
      if (this.option.autoPlay === true) {
        animation.call(this);
      }
      return this;
    };

    Sounder.prototype.play = function(callback) {
      if (this.isAnimation !== true) {
        animation.call(this);
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.pause = function(callback) {
      if (this.isAnimation === true) {
        clearTimeout(this.animeTimer);
        delete this.animeTimer;
        this.isAnimation = false;
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
      return this;
    };

    Sounder.prototype.toggle = function(callback) {
      if (this.isAnimation) {
        this.pause(callback);
      } else {
        this.play(callback);
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

  window.Sounder = window.Sounder || Sounder;

  return;

}).call(this);

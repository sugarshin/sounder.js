
/*!
sounder.js License MIT
 */

(function() {
  var Sounder;

  Sounder = (function() {
    var animation, barsAdjust, init, rendering, styling, _deepExtend, _getChildNode, _isType, _shuffle, _tsumikiColor;

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

    _tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];

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

    _shuffle = function(array) {
      var random;
      random = array.map(Math.random);
      array.sort(function(a, b) {
        return random[a] - random[b];
      });
    };

    _getChildNode = function(el) {
      var children, i, _i, _len, _ref;
      children = [];
      _ref = el.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.nodeType !== 8) {
          children.push(i);
        }
      }
      return children;
    };

    init = function(_this) {
      var col, div, fragment, i, opt, wrapper, _i, _j, _len, _ref, _ref1;
      opt = _this.option;
      if (_this.wrapper) {
        _this.wrapper = null;
      }
      if (_this.bars) {
        _this.bars = null;
      }
      wrapper = _this.wrapper ? _this.wrapper : document.createElement('div');
      fragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = opt.column; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        col = document.createElement('div');
        div = document.createElement('div');
        div.className = 'fragment';
        styling(_this, div);
        fragment.appendChild(div);
        col.className = 'col';
        col.appendChild(fragment);
        wrapper.appendChild(col);
      }
      if (!_this.wrapper) {
        _this.wrapper = wrapper;
      }
      _this.bars = _getChildNode(wrapper);
      _this.wrapper.style.height = opt.size[1] * 1.5 * opt.maxHeight + 'px';
      _this.wrapper.style.lineHeight = opt.size[1] * 1.5 * opt.maxHeight + 'px';
      _ref1 = _this.bars;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        i = _ref1[_j];
        i.style.display = 'inline-block';
        i.style.verticalAlign = 'bottom';
      }
    };

    animation = function(_this) {
      _this.isAnimation = true;
      (function() {
        var delay, loopAnime;
        delay = _this.option.speed;
        loopAnime = function() {
          barsAdjust(_this);
          _this.animeTimer = setTimeout(loopAnime, delay);
        };
        setTimeout(loopAnime, delay);
      })();
    };

    styling = function(_this, target) {
      var opt, styles;
      opt = _this.option;
      styles = target.style;
      styles.width = opt.size[0] + 'px';
      styles.height = opt.size[1] + 'px';
      styles.margin = '0 1px ' + Math.floor(opt.size[1] / 2) + 'px';
      if (opt.color === 'tsumiki') {
        styles.background = _tsumikiColor[Math.floor(Math.random() * 10)];
      } else {
        styles.background = opt.color;
      }
    };

    rendering = function(_this, output) {
      output.appendChild(_this.wrapper);
    };

    barsAdjust = function(_this) {
      var bar, currentLength, doAddFragment, doAdjust, doRemoveFragment, _i, _len, _ref;
      doAdjust = [];
      doAddFragment = function(target) {
        var div;
        div = document.createElement('div');
        div.className = 'fragment';
        styling(_this, div);
        target.insertBefore(div, target.firstChild);
      };
      doRemoveFragment = function(target) {
        var child;
        child = _getChildNode(target);
        child[0].parentNode.removeChild(child[0]);
      };
      doAdjust[0] = doAddFragment;
      doAdjust[1] = doRemoveFragment;
      _ref = _this.bars;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        currentLength = _getChildNode(bar).length;
        if (currentLength === 1) {
          doAddFragment(bar);
        } else if (currentLength === _this.option.maxHeight) {
          doRemoveFragment(bar);
        } else {
          doAdjust[Math.floor(Math.random() * 2)](bar);
        }
      }
    };

    Sounder.prototype.create = function(output) {
      init(this);
      rendering(this, output);
      if (this.option.autoPlay === true) {
        animation(this);
      }
      return this;
    };

    Sounder.prototype.play = function(callback) {
      if (this.isAnimation !== true) {
        animation(this);
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

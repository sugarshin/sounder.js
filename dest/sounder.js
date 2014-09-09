
/*!
sounder.js License MIT
 */

(function() {
  var Sounder,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Sounder = (function() {
    var animation, animeInit, deepExtend, extend, fragmentAdjust, getChildNode, init, isType, rendering, shuffle, styling, tsumikiColor;

    function Sounder(option) {
      this.reset = __bind(this.reset, this);
      this.toggle = __bind(this.toggle, this);
      this.stop = __bind(this.stop, this);
      this.start = __bind(this.start, this);
      this.create = __bind(this.create, this);
      var defaults;
      defaults = {
        size: [20, 4],
        color: '#e74c3c',
        column: 6,
        maxHeight: 10
      };
      this.option = deepExtend({}, defaults, option);
    }

    Sounder.name = 'Sounder';

    Sounder.getName = function() {
      return this.name;
    };

    tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];

    isType = function(type, obj) {
      var clas;
      clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== void 0 && obj !== null && clas === type;
    };

    deepExtend = function(out) {
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
            if (isType('Object', val)) {
              deepExtend(out[key], val);
            } else {
              out[key] = val;
            }
          }
        }
      }
      return out;
    };

    extend = function(out) {
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
            out[key] = arguments[i][key];
          }
        }
      }
      return out;
    };

    shuffle = function(array) {
      var random;
      random = array.map(Math.random);
      array.sort(function(a, b) {
        return random[a] - random[b];
      });
    };

    getChildNode = function(el) {
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
      if (_this.fragment) {
        _this.fragment = null;
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
      _this.fragment = getChildNode(wrapper);
      _this.wrapper.style.height = opt.size[1] * 1.5 * opt.maxHeight + 'px';
      _this.wrapper.style.lineHeight = opt.size[1] * 1.5 * opt.maxHeight + 'px';
      _ref1 = _this.fragment;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        i = _ref1[_j];
        i.style.display = 'inline-block';
        i.style.verticalAlign = 'bottom';
      }
    };

    animeInit = function(_this, opt) {
      _this.speed = opt && opt.speed || 50;
      if (opt && opt.autoPlay === true) {
        animation(_this);
      }
    };

    animation = function(_this) {
      _this.isAnimation = true;
      (function() {
        var delay, loopAnime;
        delay = _this.speed;
        loopAnime = function() {
          fragmentAdjust(_this);
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
        styles.background = tsumikiColor[Math.floor(Math.random() * 10)];
      } else {
        styles.background = opt.color;
      }
    };

    rendering = function(_this, output) {
      output.appendChild(_this.wrapper);
    };

    fragmentAdjust = function(_this) {
      var currentLength, doAddFragment, doAdjust, doRemoveFragment, i, _i, _len, _ref;
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
        child = getChildNode(target);
        child[0].parentNode.removeChild(child[0]);
      };
      doAdjust[0] = doAddFragment;
      doAdjust[1] = doRemoveFragment;
      _ref = _this.fragment;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        currentLength = getChildNode(i).length;
        if (currentLength === 1) {
          doAddFragment(i);
        } else if (currentLength === _this.option.maxHeight) {
          doRemoveFragment(i);
        } else {
          doAdjust[Math.floor(Math.random() * 2)](i);
        }
      }
    };

    Sounder.prototype.create = function(output, animeOpt) {
      init(this);
      rendering(this, output);

      /*
      animeOpt
        autoPlay
        speed
       */
      animeInit(this, animeOpt);
      return this;
    };

    Sounder.prototype.start = function() {
      if (!this.isAnimation) {
        animation(this);
      }
    };

    Sounder.prototype.stop = function() {
      clearTimeout(this.animeTimer);
      delete this.animeTimer;
      this.isAnimation = false;
    };

    Sounder.prototype.toggle = function() {
      if (this.isAnimation) {
        this.stop();
      } else {
        this.start();
      }
    };

    Sounder.prototype.reset = function() {
      var i, _i, _len, _ref;
      _ref = this.fragment;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        while (i.childNodes[1]) {
          i.removeChild(i.firstChild);
        }
      }
    };

    return Sounder;

  })();

  window.Sounder = window.Sounder || Sounder;

  return;

}).call(this);

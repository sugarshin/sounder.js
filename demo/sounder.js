
/*!
sounder.js License MIT
 */
(function(exports) {
  var Sounder;
  Sounder = (function() {
    var colAdjust, getChildNode, init, rendering, shuffle, styling, tsumikiColor;

    function Sounder(size, color, row, height, speed) {
      this.size = size != null ? size : [20, 4];
      this.color = color != null ? color : '#16a085';
      this.row = row != null ? row : 6;
      this.height = height != null ? height : 10;
      this.speed = speed != null ? speed : 60;
    }

    Sounder.name = 'Sounder';

    Sounder.getName = function() {
      return this.name;
    };

    tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];

    shuffle = function(array) {
      var random;
      random = array.map(Math.random);
      array.sort(function(a, b) {
        return random[a] - random[b];
      });
    };

    getChildNode = function(el) {
      var children, i, _i, _ref;
      children = [];
      for (i = _i = 0, _ref = el.children.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (el.children[i].nodeType !== 8) {
          children.unshift(el.children[i]);
        }
      }
      return children;
    };

    init = function(_this) {
      var col, div, fragment, i, wrapper, _i, _j, _ref, _ref1;
      if (_this.wrapper) {
        _this.wrapper = null;
      }
      if (_this.fragment) {
        _this.fragment = null;
      }
      wrapper = _this.wrapper ? _this.wrapper : document.createElement('div');
      fragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = _this.row - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
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
      _this.wrapper.style.height = _this.size[1] * 1.5 * _this.height + 'px';
      _this.wrapper.style.lineHeight = _this.size[1] * 1.5 * _this.height + 'px';
      for (i = _j = 0, _ref1 = _this.fragment.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        _this.fragment[i].style.display = 'inline-block';
        _this.fragment[i].style.verticalAlign = 'bottom';
      }
    };

    styling = function(_this, target) {
      target.style.width = _this.size[0] + 'px';
      target.style.height = _this.size[1] + 'px';
      target.style.margin = '0 1px ' + Math.floor(_this.size[1] / 2) + 'px';
      if (_this.color === 'tsumiki') {
        target.style.background = tsumikiColor[Math.floor(Math.random() * 10)];
      } else {
        target.style.background = _this.color;
      }
    };

    rendering = function(_this, output) {
      output.appendChild(_this.wrapper);
    };

    colAdjust = function(_this) {
      var currentLength, doAddCol, doAdjust, doRemoveCol, i, _i, _ref;
      doAdjust = [];
      doAddCol = function(target) {
        var div;
        div = document.createElement('div');
        div.className = 'fragment';
        styling(_this, div);
        target.appendChild(div);
      };
      doRemoveCol = function(target) {
        var child;
        child = getChildNode(target);
        child[0].parentNode.removeChild(child[0]);
      };
      doAdjust[0] = doAddCol;
      doAdjust[1] = doRemoveCol;
      for (i = _i = 0, _ref = _this.fragment.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        currentLength = getChildNode(_this.fragment[i]).length;
        if (currentLength === 1) {
          doAddCol(_this.fragment[i]);
        } else if (currentLength === _this.height) {
          doRemoveCol(_this.fragment[i]);
        } else {
          doAdjust[Math.floor(Math.random() * 2)](_this.fragment[i]);
        }
      }
    };

    Sounder.prototype.create = function(output) {
      init(this);
      rendering(this, output);
      return this;
    };

    Sounder.prototype.anime = function() {
      var _this;
      _this = this;
      this.isAnimation = true;
      (function() {
        var delay, loopAnime;
        delay = _this.speed;
        loopAnime = function() {
          colAdjust(_this);
          _this.animeTimer = setTimeout(arguments.callee, delay);
        };
        setTimeout(loopAnime, delay);
      })();
      return this;
    };

    Sounder.prototype.start = function() {
      if (!this.isAnimation) {
        this.anime();
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
      var i, _i, _ref;
      for (i = _i = 0, _ref = this.fragment.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        while (this.fragment[i].childNodes[1]) {
          this.fragment[i].removeChild(this.fragment[i].firstChild);
        }
      }
    };

    return Sounder;

  })();
  exports.Sounder = exports.Sounder || Sounder;
})(this);

//# sourceMappingURL=sounder.js.map

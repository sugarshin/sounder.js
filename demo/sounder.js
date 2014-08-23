
/*!
sounder.js License MIT
 */
(function(exports) {
  var Sounder;
  Sounder = (function() {
    var getChildNode, init, rendering, styling;

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

    function Sounder(size, color, row, height, speed) {
      this.size = size != null ? size : [20, 4];
      this.color = color != null ? color : 'green';
      this.row = row != null ? row : 6;
      this.height = height != null ? height : 10;
      this.speed = speed;
    }

    init = function(_this) {
      var col, div, fragment, i, wrapper, _i, _ref;
      wrapper = _this.wrapper ? _this.wrapper : document.createElement('div');
      fragment = document.createDocumentFragment();
      for (i = _i = 0, _ref = _this.row - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        col = document.createElement('div');
        div = document.createElement('div');
        div.className = 'fragment';
        div.style.width = _this.size[0] + 'px';
        div.style.height = _this.size[1] + 'px';
        div.style.background = _this.color;
        fragment.appendChild(div);
        col.className = 'col';
        col.appendChild(fragment);
        wrapper.appendChild(col);
      }
      if (!_this.wrapper) {
        _this.wrapper = wrapper;
      }
      _this.fragment = getChildNode(wrapper);
    };

    styling = function(_this) {
      var i, _i, _ref;
      _this.wrapper.style.overflow = 'hidden';
      for (i = _i = 0, _ref = _this.fragment.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _this.fragment[i].style.margin = '0 1px 1px';
        _this.fragment[i].style.display = 'inline-block';
      }
    };

    rendering = function(_this, output) {
      output.appendChild(_this.wrapper);
      _this.wrapper = null;
      _this.fragment = null;
    };

    Sounder.prototype.create = function(output) {
      init(this);
      styling(this);
      rendering(this, output);
      return this;
    };

    Sounder.prototype.remove = function(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      return this;
    };

    Sounder.prototype.anime = function() {
      var _this;
      _this = this;
      (function() {
        var delay;
        delay = 3000;
        setTimeout((function() {
          console.warn(_this);
          _this.remove(document.getElementById("output"));
          _this.size[0] += 1;
          _this.size[1] += 1;
          _this.create(document.getElementById("output"));
          return setTimeout(arguments.callee, delay);
        }), delay);
      })();
      return this;
    };

    Sounder.prototype.start = function() {
      console.warn(this.size);
    };

    Sounder.prototype.stop = function() {
      console.warn(this.size);
    };

    Sounder.name = 'Sounder';

    Sounder.getName = function() {
      return this.name;
    };

    return Sounder;

  })();
  exports.Sounder = exports.Sounder || Sounder;
})(this);

//# sourceMappingURL=sounder.js.map

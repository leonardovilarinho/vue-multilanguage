"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiLanguage = function () {
  function MultiLanguage() {
    _classCallCheck(this, MultiLanguage);
  }

  _createClass(MultiLanguage, [{
    key: 'init',


    /* constructor, setter languages object */
    value: function init(_languages, _vue) {
      this.languages = _languages;
      this.vue = _vue;
    }

    /* get modifiers from directive, find in languages object and replace values */

  }, {
    key: 'relaunchByDirective',
    value: function relaunchByDirective(el, binding, vnode) {

      this.changeChildrenLanguage(vnode.context.$parent, vnode.context.$language);

      var current = this.languages[vnode.context.$language];

      var location = '';

      location = location.substring(0, location.length - 1);

      var hasParams = typeof binding.value != 'undefined';
      var params = [];

      if (hasParams) {

        params = binding.value;

        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) != 'object') params = [params];
      }

      var find = current;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(binding.modifiers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _path = _step.value;

          find = find[_path.trim()];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (hasParams) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(params)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var path = _step2.value;

            find = find.replace('{' + path + '}', params[path]);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      el.innerHTML = find;
    }
  }, {
    key: 'search',
    value: function search(_language, path, params) {
      var current = this.languages[_language];

      if (path.indexOf('.') !== -1) path = path.split('.');else path = [path];

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) != 'object') params = [params];

      var find = current;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = path[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var p = _step3.value;

          find = find[p.trim()];
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.keys(params)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _path2 = _step4.value;

          find = find.replace('{' + _path2 + '}', params[_path2]);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return find;
    }
  }, {
    key: 'changeChildrenLanguage',
    value: function changeChildrenLanguage(node, language) {
      if (typeof node.$children != 'undefined') {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = node.$children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var ch = _step5.value;

            ch.$language = language;
            this.changeChildrenLanguage(ch, language);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    }
  }]);

  return MultiLanguage;
}();

var multi = new MultiLanguage();

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function (Vue, languages) {

  multi.init(languages, Vue);

  /* get current language by browser */
  var userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.substr(0, 2);

  var init = Vue.prototype._init;

  /* define $language variable reative */
  Vue.prototype._init = function (options) {
    options = options || {};
    Vue.util.defineReactive(this, '$language', userLang || 'en');
    init.call(this, options);
  };

  Vue.prototype.translate = function (language, path) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return multi.search(language, path, params);
  };

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function bind(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    update: function update(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    inserted: function inserted(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    unbind: function unbind(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    }
  });
};

/* export my class */
exports.default = MultiLanguage;
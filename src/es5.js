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
    value: function init(_languages) {
      this.languages = _languages;
    }

    /* get modifiers from directive, find in languages object and replace values */

  }, {
    key: 'relaunchByDirective',
    value: function relaunchByDirective(el, binding, vnode) {
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
  }]);

  return MultiLanguage;
}();

var multi = new MultiLanguage();

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function (Vue, languages) {

  multi.init(languages);

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

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function bind(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    update: function update(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    }
  });
};

/* export my class */
exports.default = MultiLanguage;
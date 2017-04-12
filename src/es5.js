"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

String.prototype.format = function () {
  var args = [].slice.call(arguments);
  return this.replace(/(\{\d+\})/g, function (a) {
    return args[+a.substr(1, a.length - 2) || 0];
  });
};

var MultiLanguage = function () {
  function MultiLanguage() {
    _classCallCheck(this, MultiLanguage);
  }

  _createClass(MultiLanguage, [{
    key: 'init',
    value: function init(path, language, store) {
      var _this = this;

      this._store = store;
      this._path = path;
      if (localStorage.getItem('lang_current') == null) {
        this._language = language;
        localStorage.setItem('lang_current', language);
      } else this._language = localStorage.getItem('lang_current');

      this.getContent(false, function (r) {
        return _this._store.state.mlang = JSON.parse(r);
      });
    }
  }, {
    key: 'getContent',
    value: function getContent(ass, callback) {
      var url = this._path + '/' + this._language + '.json';
      var rawFile = new XMLHttpRequest();

      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", url, ass);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") callback(rawFile.responseText);else callback('{}');
      };
      rawFile.send(null);
    }
  }, {
    key: 'language',
    set: function set(language) {
      var _this2 = this;

      if (language != this._language) {
        localStorage.setItem('lang_current', language);
        this._language = localStorage.getItem('lang_current');
        this.getContent(false, function (r) {
          return _this2._store.state.mlang = JSON.parse(r);
        });
      }
    }
  }, {
    key: 'content',
    get: function get() {
      return this._store.state.mlang;
    }
  }]);

  return MultiLanguage;
}();

var multi = new MultiLanguage();

MultiLanguage.install = function (Vue, _ref) {
  var path = _ref.path,
      d_language = _ref.d_language,
      store = _ref.store;


  multi.init(path, d_language, store);

  Vue.prototype.changeLanguage = function (newLang) {
    multi.language = newLang;
  };

  Vue.prototype.l = function (value) {
    var _content;

    var _params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var content = multi.content,
        params = [],
        param = void 0,
        bind = [],
        attrs = void 0;

    if (value.indexOf('|') !== -1) {
      bind = value.split('|');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = bind[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          attrs = _step.value;

          params = attrs.split('.');

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              param = _step2.value;

              if (content.hasOwnProperty(param)) content = content[param];else content = multi.content;
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

          if (typeof content == 'string') break;
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
    } else {
      params = value.split('.');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = params[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          param = _step3.value;

          if (content.hasOwnProperty(param)) content = content[param];else return;
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
    }

    if ((typeof _params === 'undefined' ? 'undefined' : _typeof(_params)) == 'object') content = (_content = content).format.apply(_content, _toConsumableArray(_params));

    return typeof content == 'string' ? content : '';
  };

  Vue.l = Vue.prototype.l;

  Vue.changeLanguage = Vue.prototype.changeLanguage;
};

exports.default = MultiLanguage;
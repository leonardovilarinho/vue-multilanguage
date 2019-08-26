'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // @ts-check


var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _gettingStrategy = require('./enums/getting-strategy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBus = new _vue2.default();

var currentGlobal = null;
/** @type {Array} */
var _with2 = null;
/**
 * Register all plugin actions
 *
 * @param {String} initial initial language
 * @param {Array} languages array with languages
 * @param {Boolean} save if save language in local storage
 * @param {Function} middleware function for handler get
 * @param {String} gettingStrategy translation getting strategy
 */
var register = exports.register = function register(initial, languages, save, middleware, gettingStrategy) {
  if (save) {
    var lang = window.localStorage.getItem('vueml-lang');
    if (lang === null) {
      window.localStorage.setItem('vueml-lang', initial);
    } else {
      initial = lang;
    }
  }

  if (initial === null) {
    return console.error('[vue-multilanguage] initial language is null, please set a value');
  }
  currentGlobal = initial;
  return {
    /**
     * Called before create component
     */
    beforeCreate: function beforeCreate() {
      var _this = this;

      var self = this;

      this.$ml = {
        /**
         * Change current language
         * @param {string} param new language
         */
        change: function change(param) {
          var current = languages.filter(function (l) {
            return l.name === param;
          });
          if (current.length === 0) {
            return console.error('[vue-multilanguage] \'' + param + '\' language not found');
          }

          if (currentGlobal !== param) {
            if (save) {
              window.localStorage.setItem('vueml-lang', param);
            }
            EventBus.$emit('vueml-language-changed', param);
          }
        },
        with: function _with(name) {
          var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (value !== false) {
            if (_with2 === null) {
              _with2 = [];
            }
            _with2.push({ name: name, value: value });
          } else {
            _with2 = [name];
          }
          return this;
        },
        get: function get(path) {
          var initialPath = path;

          var current = languages.filter(function (l) {
            return l.name === currentGlobal;
          });
          if (current.length > 1) {
            return console.error('[vue-multilanguage] you define \'' + currentGlobal + '\' language two or more times');
          }
          var db = current[0].database;

          if ('ml' + path in self) {
            path = 'ml' + path;
            _with2 = self[path]._with;
            path = self[path].path;
          }

          path = middleware(self, path);

          /** @type {Array} */
          var splitedPath = path.split('.');

          splitedPath.forEach(function (ph) {
            if (ph in db) {
              db = db[ph];
            } else {
              if (gettingStrategy !== _gettingStrategy.GettingStrategy.RETURN_PATH_BY_DEFAULT_WITHOUT_ERROR) {
                console.error('[vue-multilanguage] path \'' + path + '\' unknown from \'' + ph + '\'');
              }
              if (gettingStrategy === _gettingStrategy.GettingStrategy.RETURN_PATH_BY_DEFAULT || gettingStrategy === _gettingStrategy.GettingStrategy.RETURN_PATH_BY_DEFAULT_WITHOUT_ERROR) {
                db = initialPath;
              } else {
                return db = false;
              }
            }
          });

          if (db !== false) {
            if (Array.isArray(_with2)) {
              _with2.forEach(function (w) {
                if ((typeof w === 'undefined' ? 'undefined' : _typeof(w)) !== 'object') {
                  db = db.replace(/\{0\}/g, _with2[0]);
                } else {
                  var replace = '{' + w.name + '}';
                  while (db.includes(replace)) {
                    db = db.replace(replace, w.value);
                  }
                }
              });
            }
            _with2 = null;

            return db;
          }
        },


        /**
         * get current permission
         */
        get current() {
          return currentGlobal;
        },

        /**
         * get languages list
         */
        get list() {
          return languages.map(function (l) {
            return l.name;
          });
        },

        /**
         * get languages database list
         */
        get db() {
          return languages.map(function (l) {
            return l.database;
          });
        }
      };

      EventBus.$on('vueml-language-changed', function (newLanguage) {
        currentGlobal = newLanguage;
        _this.$forceUpdate();
      });
    }
  };
};
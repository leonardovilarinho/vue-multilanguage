'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

var _vueEBus = require('vue-e-bus');

var _vueEBus2 = _interopRequireDefault(_vueEBus);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var currentGlobal = null;
/** @type {Array} */
var _with2 = null;
/**
 * Register all plugin actions
 * 
 * @param {String} initial initial language
 * @param {Array} languages array with languages
 * @param {Boolean} save if save language in local storage
 */
var register = exports.register = function register(initial, languages, save) {

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
            _vueEBus2.default.$emit('vueml-language-changed', param);
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
          var current = languages.filter(function (l) {
            return l.name === currentGlobal;
          });
          if (current.length > 1) {
            return console.error('[vue-multilanguage] you define \'' + currentGlobal + '\' language two or more times');
          }
          var db = current[0].database;

          if (path in self) {
            _with2 = self[path]._with;
            path = self[path].path;
          }

          /** @type {Array} */
          var splitedPath = path.split('.');

          splitedPath.forEach(function (ph) {
            if (ph in db) {
              db = db[ph];
            } else {
              console.error('[vue-multilanguage] path \'' + path + '\' unknown from \'' + ph + '\'');
              return db = false;
            }
          });

          if (db !== false) {
            if (_with2.length > 1) {
              _with2.forEach(function (w) {
                var replace = '{' + w.name + '}';
                while (db.includes(replace)) {
                  db = db.replace(replace, w.value);
                }
              });
            } else if (_with2 !== null) {
              db = db.replace(/\{0\}/g, _with2[0]);
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
        }
      };

      _vueEBus2.default.$on('vueml-language-changed', function (newLanguage) {
        currentGlobal = newLanguage;
        _this.$forceUpdate();
      });
    }
  };
};
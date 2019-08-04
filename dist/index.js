'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLBuilder = exports.MLanguage = exports.MLCreate = exports.MLInstaller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _install2 = require('./install');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint-disable */
// @ts-check


/**
 * @typedef {Object} VueMultiLanguageParams
 * @property {String} initial
 * @property {Array} languages
 * @property {Boolean} [save]
 * @property {Function} [middleware]
 * @property {String} [gettingStrategy]
 */

/**  @type {VueMultiLanguageParams} */
var options = {
  initial: null,
  languages: [],
  save: false,
  middleware: null,
  gettingStrategy: ''

  /** @type {VueConstructor} */
};var Vue = void 0;

var MLInstaller =
/**
   * function for install plugin with Vue.use
   * @param {VueConstructor} _Vue Vue constructor
   */
exports.MLInstaller = function MLInstaller(_Vue) {
  Vue = _Vue;
};

var MLCreate =
/**
 * Constructor
 * @param {VueMultiLanguageParams} _options object of settings
 */
exports.MLCreate = function MLCreate(_options) {
  _classCallCheck(this, MLCreate);

  options = _options;
  (0, _install2._install)(Vue, options);
};

var MLanguage = exports.MLanguage = function () {
  /**
   * Create new language
   * @param {string} name language name
   */
  function MLanguage(name) {
    _classCallCheck(this, MLanguage);

    this.name = name;
  }

  /**
   * Create new language with pharses
   * @param {Object}  database object with all language pharses
   * @return {Object} object with language sentences
   */


  _createClass(MLanguage, [{
    key: 'create',
    value: function create(database) {
      var name = this.name;

      return { name: name, database: database };
    }
  }]);

  return MLanguage;
}();

var MLBuilder = exports.MLBuilder = function () {
  /**
   * Create new language builder
   * @param {string} path language path
   */
  function MLBuilder(path) {
    _classCallCheck(this, MLBuilder);

    this.path = path;
    this._with = null;
  }

  /**
   * Create new language with pharses
   * @param {String}  name name or value from message
   * @param {String|Boolean}  value value from message
   * @return {MLBuilder} builder
   */


  _createClass(MLBuilder, [{
    key: 'with',
    value: function _with(name) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (value !== false) {
        if (this._with === null) {
          this._with = [];
        }
        // @ts-ignore
        this._with.push({
          name: name,
          value: value
        });
      } else {
        this._with = [name];
      }
      return this;
    }
  }]);

  return MLBuilder;
}();
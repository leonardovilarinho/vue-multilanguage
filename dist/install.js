'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._install = undefined;

var _vue = require('vue');

var _mixin = require('./mixin');

/**
 * @typedef {Object} VueMultiLanguageParams
 * @property {String} initial
 * @property {Array} languages
 * @property {Boolean} [save]
 * @property {Function} [middleware]
 */

/**
 * Function for install plugin with Vue.use
 * @function
 * @param {VueConstructor} _Vue
 * @param {VueMultiLanguageParams} options
 */
// @ts-check
var _install = exports._install = function _install(_Vue, options) {
  var initial = options.initial,
      languages = options.languages,
      save = options.save,
      middleware = options.middleware;


  var mixin = (0, _mixin.register)(initial, languages, save || false, middleware || function (self, path) {
    return path;
  });

  // @ts-ignore
  if (mixin !== undefined) {
    // @ts-ignore
    _Vue.mixin(mixin);
  }
};
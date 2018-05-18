// @ts-check
import { VueConstructor } from 'vue'
import { register } from './mixin'

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
export const _install = (_Vue, options) => {
  const { initial, languages, save, middleware } = options

  const mixin = register(
    initial,
    languages,
    save || false,
    middleware || ((self, path) => path)
  )

// @ts-ignore
  if (mixin !== undefined) {
    // @ts-ignore
    _Vue.mixin(mixin)
  }
}

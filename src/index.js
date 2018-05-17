/* eslint-disable */
// @ts-check
import { VueConstructor } from 'vue'
import { _install } from './install'
/**
 * @typedef {Object} VueMultiLanguageParams
 * @property {String} initial
 * @property {Array} languages
 * @property {Boolean} [save]

 */

/**  @type {VueMultiLanguageParams} */
let options = {
  initial: null,
  languages: [],
  save: false
}

/** @type {VueConstructor} */
let Vue

export const MLInstaller = 
/**
   * function for install plugin with Vue.use
   * @param {VueConstructor} _Vue Vue constructor
   */
(_Vue) => {
  Vue = _Vue
}

export class MLCreate {
  /**
   * Constructor
   * @param {VueMultiLanguageParams} _options object of settings
   */
  constructor(_options) {
    options = _options
    _install(Vue, options)
  }
}
  
export class MLanguage {
  /**
   * Create new language
   * @param {string} name language name
   */
  constructor(name) {
    this.name = name
  }

  /**
   * Create new language with pharses
   * @param {Object}  database object with all language pharses
   * @return {Object} object with language sentences
   */
  create(database) {
  	const { name } = this
    return { name, database }
  }
}

export class MLBuilder {
  /**
   * Create new language builder
   * @param {string} path language path
   */
  constructor(path) {
    this.path = path
    this._with = null
  }

  /**
   * Create new language with pharses
   * @param {String}  name name or value from message
   * @param {String|Boolean}  value value from message
   * @return {MLBuilder} builder
   */
  with(name, value = false) {
  	if (value !== false) {
  	  if (this._with === null) {
  	    this._with = []
  	  }
      // @ts-ignore
      this._with.push({
  	    name,
  	    value
  	  })
  	} else {
  	  this._with = [name]
  	}
  	return this
  }
}
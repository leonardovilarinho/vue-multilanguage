// @ts-check
import EventBus from 'vue-e-bus'
import Vue from 'vue'

let currentGlobal = null
/** @type {Array} */
let _with = null
/**
 * Register all plugin actions
 * 
 * @param {String} initial initial language
 * @param {Array} languages array with languages
 * @param {Boolean} save if save language in local storage
 */
export const register = (initial, languages, save) => {

  if (save) {
    const lang = window.localStorage.getItem('vueml-lang')
    if (lang === null) {
      window.localStorage.setItem('vueml-lang', initial)
    } else {
      initial = lang
    }
  }

  if (initial === null) {
    return console.error('[vue-multilanguage] initial language is null, please set a value')
  }
  currentGlobal = initial
  return {
    /**
     * Called before create component
     */
    beforeCreate () {
      const self = this

      this.$ml = {
        /**
         * Change current language
         * @param {string} param new language
         */
        change (param) {
          const current = languages.filter(l => l.name === param)
          if (current.length === 0) {
            return console.error(`[vue-multilanguage] '${param}' language not found`)
          }

          if (currentGlobal !== param) {
            if (save) {
              window.localStorage.setItem('vueml-lang', param)
            }
            EventBus.$emit('vueml-language-changed', param)
          }
        },

        with (name, value = false) {
          if (value !== false) {
            if (_with === null) {
              _with = []
            }
            _with.push({ name, value })
          } else {
            _with = [name]
          }
          return this
        },

        get (path) {
          const current = languages.filter(l => l.name === currentGlobal)
          if (current.length > 1) {
            return console.error(`[vue-multilanguage] you define '${currentGlobal}' language two or more times`)
          }
          let db = current[0].database

          if (path in self) {
            _with = self[path]._with
            path = self[path].path
          }

          /** @type {Array} */
          const splitedPath = path.split('.')

          splitedPath.forEach(ph => {
            if (ph in db) {
              db = db[ph]
            } else {
              console.error(`[vue-multilanguage] path '${path}' unknown from '${ph}'`)
              return (db = false)
            }
          })

          if (db !== false) {
            if (Array.isArray(_with)) {
              if (_with.length > 1) {
                _with.forEach(w => {
                  const replace = `{${w.name}}`
                  while (db.includes(replace)) {
                    db = db.replace(replace, w.value)
                  }
                })
              } else if (_with !== null) {
                db = db.replace(/\{0\}/g, _with[0])
              }
            }
            _with = null
            return db
          }
        },

        /**
         * get current permission
         */
        get current () {
          return currentGlobal
        },

        /**
         * get languages list
         */
        get list() {
          return languages.map(l => l.name)
        }
      }

      EventBus.$on('vueml-language-changed', (newLanguage) => {
        currentGlobal = newLanguage
        this.$forceUpdate()
      })
    }
  }
}

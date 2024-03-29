// @ts-check
import Vue from 'vue'
import { GettingStrategy } from './enums/getting-strategy'
const EventBus = new Vue()

function setCookie(name, value) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + 1000000 * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let currentGlobal = null
/** @type {Array} */
let _with = null
/**
 * Register all plugin actions
 *
 * @param {String} initial initial language
 * @param {Array} languages array with languages
 * @param {Boolean} save if save language in local storage
 * @param {Function} middleware function for handler get
 * @param {String} gettingStrategy translation getting strategy
 */
export const register = (initial, languages, save, middleware, gettingStrategy) => {
  if (save) {
    try {
      const lang = localStorage.getItem('vueml-lang')
      if (lang === null) {
        localStorage.setItem('vueml-lang', initial)
      } else {
        initial = lang
      }
    } catch(error) {
       const lang = getCookie('vueml-lang')
        if (lang === null) {
          setCookie('vueml-lang', initial)
        } else {
          initial = lang
        }
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
            try {
              if (save) {
                localStorage.setItem('vueml-lang', param)
              }
            } catch (error) {
              setCookie('vueml-lang', param)
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
          const initialPath = path;

          const current = languages.filter(l => l.name === currentGlobal)
          if (current.length > 1) {
            return console.error(`[vue-multilanguage] you define '${currentGlobal}' language two or more times`)
          }
          let db = current[0].database

          if (`ml${path}` in self) {
            path = `ml${path}`
            _with = self[path]._with
            path = self[path].path
          }

          path = middleware(self, path)

          /** @type {Array} */
          const splitedPath = path.split('.')

          splitedPath.forEach(ph => {
            if (ph in db) {
              db = db[ph]
            } else {
              if (gettingStrategy !== GettingStrategy.RETURN_PATH_BY_DEFAULT_WITHOUT_ERROR) {
                console.error(`[vue-multilanguage] path '${path}' unknown from '${ph}'`)
              }
              if (gettingStrategy === GettingStrategy.RETURN_PATH_BY_DEFAULT || gettingStrategy === GettingStrategy.RETURN_PATH_BY_DEFAULT_WITHOUT_ERROR){
                db = initialPath;
              } else {
                return (db = false)
              }
            }
          })

          if (db !== false) {
            if (Array.isArray(_with)) {
              _with.forEach(w => {
                if (typeof w !== 'object') {
                  db = db.replace(/\{0\}/g, _with[0])
                } else {
                  const replace = `{${w.name}}`
                  while (db.includes(replace)) {
                    db = db.replace(replace, w.value)
                  }
                }
              })
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
         * get event bus
         */
        get bus () {
          return EventBus
        },

        /**
         * get languages list
         */
        get list() {
          return languages.map(l => l.name)
        },

        /**
         * get languages database list
         */
        get db() {
          return languages.map(function (l) {
            return l.database;
          });
        }
      }

      EventBus.$on('vueml-language-changed', (newLanguage) => {
        currentGlobal = newLanguage
        this.$forceUpdate()
      })
    }
  }
}

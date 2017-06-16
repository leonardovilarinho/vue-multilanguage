"use strict"

class MultiLanguage {

  /* constructor, setter languages object */
  init(_languages, _vue) {
    this.defaultLanguage = ''
    this.languages = _languages
    this.vue = _vue

    let userLang

    if (_languages.default) {
      this.defaultLanguage = _languages.default
      delete _languages.default
      /* set current language from default */
      userLang = this.matchLanguage(this.defaultLanguage)
    }
    /* if we're in a browser */
    let isBrowser = false
    try {
      isBrowser = typeof navigator !== 'undefined'
    }
    catch(e) {}

    if ( !userLang && isBrowser ) {
      userLang = navigator.language || navigator.userLanguage
      /* First try matching full language, then shortened code.
       * This is important for languages like Chinese */
      userLang = this.matchLanguage(userLang) || this.matchLanguage(userLang.substr(0, 2))
    }
    /* if all else fails, choose the first language */
    if ( !userLang ) {
      userLang = Object.keys(this.languages)[0]
    }
    this.userLang = userLang
  }

  /* get modifiers from directive, find in languages object and replace values */
  relaunchByDirective(el, binding, vnode) {

    this.changeChildrenLanguage(vnode.context.$parent, vnode.context.$language)

    let hasParams = typeof binding.value !== 'undefined'
    let current, params = []

    if( hasParams ) {

      params = binding.value

      if( typeof params !== 'object' )
        params = [ params ]
    }

    function getLanguage(current) {
      if( !current ) return

      let find = current
      
      Object.keys(binding.modifiers).forEach((path) => {
        let f = find[ path.trim() ]
        if( f ) {
          find = f
        }
      })

      return typeof find === 'string' ? find : ''
    }

    if( !vnode.context.$options.messages || !(current = getLanguage(vnode.context.$options.messages[ vnode.context.$language ])) )
      current = getLanguage(this.languages[ vnode.context.$language ])

    // Set the key value from the markup itself
    if( !current ) {
      let val = el.innerHTML.trim()
      // Value is embedded, so we need to store it so that we don't lose it when switching languages
      if( val !== '' ) {
        if ( !vnode.context.$options.messages ) {
          vnode.context.$options.messages = {}
        }
        let optionPath = vnode.context.$options.messages[ vnode.context.$language ]
        if ( !optionPath ) {
          optionPath = vnode.context.$options.messages[ vnode.context.$language ] = {}
        } 
        let modifiers = Object.keys(binding.modifiers)

        modifiers.forEach((path, idx) => {
          if( (idx + 1) === modifiers.length ) {
            optionPath[path] = {}
            optionPath = optionPath[path]
          }
          else {
            optionPath[path] = val
          }
        })
        
        current = val
      }
    }

    if( current && hasParams ) {
      Object.keys(params).forEach((path) => {
        current = current.replace(`{${path}}`, params[path])
      })
    }
    
    el.innerHTML = current
  }

  search(current, path, params) {

    if(path.indexOf('.') !== -1)
      path = path.split('.')
    else
      path = [path]

    if( typeof params != 'object' )
      params = [ params ]

    let find = current
    path.forEach((p) => {
      find = find[ p.trim() ]
    })

    Object.keys(params).forEach((path) => {
      find = find.replace(`{${path}}`, params[path])
    })

    return find
  }

  changeChildrenLanguage(node, language) {
    if(typeof node.$children != 'undefined') {
      node.$children.forEach((ch) => {
        ch.$language = language
        this.changeChildrenLanguage(ch, language)
      });
    }
  }

  matchLanguage(lang) {
    if( !lang ) return ''
    let match = ''
    Object.keys(this.languages).forEach((path) => {
      path = path.toLowerCase()
      if(lang.toLowerCase() === path) {
        match = path
      }
    })
    /* if language = 'en', match a 'en-CA' language key */
    // if( !match ) {
    //   Object.keys(this.languages).forEach((path) => {
    //     path = path.toLowerCase()
    //     if(lang.toLowerCase() === path.substr(0,2)) {
    //       match = path
    //     }
    //   })
    // }
    return match
  }
}

const multi = new MultiLanguage()

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function(Vue, languages){

  multi.init(languages, Vue)

  const init = Vue.prototype._init

  /* define $language variable reative */
  Vue.prototype._init = function(options) {
    options = options || {}
    Vue.util.defineReactive(this, '$language', multi.userLang)
    init.call(this, options)
  }

  Vue.prototype.translate = function(language, path, params = {}) {
    let result = ''

    if (this.$options.messages && this.$options.messages[ language ]) {
      result = multi.search(this.$options.messages[ language ], path, params)
    }
    if (!result) {
      result = multi.search(multi.languages[ language ], path, params)
    }
    return result
  }

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    update: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    inserted: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    componentUpdated: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    unbind: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
  })

}

/* export my class */
export default MultiLanguage
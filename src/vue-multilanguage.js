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
      userLang = this.matchLanguage(userLang) || this.matchLanguage(userLang.substr(0, 2))
    }

    const languageKeys = Object.keys(this.languages)
    
    if ( !userLang )
      userLang = languageKeys[0]
    
    this.userLang = userLang
        
    if (languageKeys.includes(localStorage.getItem('vue-lang')))
      this.userLang = localStorage.getItem('vue-lang')
        
    window.localStorage.setItem('vue-lang', this.userLang)
  }

  relaunchByDirective(el, binding, vnode) {
    let hasParams = typeof binding.value !== 'undefined'
    let current, params = []

    if( hasParams ) {
      params = binding.value

      if( typeof params !== 'object' )
        params = [ params ]
    }

    function getLanguage(current) {
      if( !current )
        return

      let find = current
      
      Object.keys(binding.modifiers).forEach((path) => {
        let f = find[ path.trim() ]
        if( f )
          find = f
      })

      return typeof find === 'string' ? find : ''
    }

    if( !vnode.context.$options.messages || !(current = getLanguage(vnode.context.$options.messages[ vnode.context.language ])) )
      current = getLanguage(this.languages[ vnode.context.language ])

    if( !current ) {
      let val = el.innerHTML.trim()
      if( val !== '' ) {
        if ( !vnode.context.$options.messages )
          vnode.context.$options.messages = {}

        let optionPath = vnode.context.$options.messages[ vnode.context.language ]

        if ( !optionPath )
          optionPath = vnode.context.$options.messages[ vnode.context.language ] = {}

        let modifiers = Object.keys(binding.modifiers)

        modifiers.forEach((path, idx) => {
          if( (idx + 1) === modifiers.length ) {
            optionPath[path] = {}
            optionPath = optionPath[path]
          }
          else
            optionPath[path] = val
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
    path.forEach( (p) => find = find[ p.trim() ] )

    Object.keys(params).forEach((path) => {
      find = find.replace(`{${path}}`, params[path])
    })

    return find
  }

  matchLanguage(lang) {
    if( !lang ) return ''
    let match = ''
    Object.keys(this.languages).forEach((path) => {
      path = path.toLowerCase()
      if(lang.toLowerCase() === path)
        match = path
    })

    return match
  }
}

const multi = new MultiLanguage()

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function(Vue, languages){

  const bus = new Vue()
  multi.init(languages, Vue)

  Vue.mixin({
    data() {
      return { language: window.localStorage.getItem('vue-lang') }
    },
    watch: {
      language(value) {
          multi.defaultLanguage = value
          window.localStorage.setItem('vue-lang', value)
          bus.$emit('lang-changed', multi.defaultLanguage)
          this.$forceUpdate()
      }
    },
    mounted() {
        bus.$on('lang-changed', (language) => this.language = language)
    },
    methods: {
      translate(path, params = {}) {          
        let result = ''
      
        if (this.$options.messages && this.$options.messages[ this.language ])
          result = multi.search(this.$options.messages[ this.language ], path, params)
        
        if (!result)
          result = multi.search(multi.languages[ this.language ], path, params)
        return result
      }
    }
  })

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    componentUpdated: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
  })
}

/* export my class */
export default MultiLanguage
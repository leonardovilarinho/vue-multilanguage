"use strict"

class MultiLanguage {

  /* constructor, setter languages object */
  init(_languages) {
    this.languages = _languages
  }

  /* get modifiers from directive, find in languages object and replace values */
  relaunchByDirective(el, binding, vnode) {
    let current = this.languages[ vnode.context.$language ]

    let location = ''

    location = location.substring(0, location.length -1)

    let hasParams = typeof binding.value != 'undefined'
    let params = []

    if( hasParams ) {

      params = binding.value

      if( typeof params != 'object' )
        params = [ params ]
    }

    let find = current
    for(let path of Object.keys(binding.modifiers))
      find = find[ path.trim() ]

    if(hasParams) {
      for(let path of Object.keys(params))
        find = find.replace(`{${path}}`, params[path])
    }
    el.innerHTML = find
  }
}

const multi = new MultiLanguage()

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function(Vue, languages){

  multi.init(languages)

  /* get current language by browser */
  let userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.substr(0, 2)

  const init = Vue.prototype._init

  /* define $language variable reative */
  Vue.prototype._init = function(options) {
    options = options || {}
    Vue.util.defineReactive(this, '$language', userLang || 'en')
    init.call(this, options)
  }

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
    update: function (el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode)
    },
  })

}

/* export my class */
export default MultiLanguage
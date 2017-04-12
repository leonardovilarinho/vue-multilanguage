"use strict"

String.prototype.format = function () {
  var args = [].slice.call(arguments);
  return this.replace(/(\{\d+\})/g, function (a){
      return args[ +(a.substr(1, a.length-2)) || 0 ];
  });
};

class MultiLanguage {

  init(path, language) {
    this._path = path
    if(localStorage.getItem('lang_current') == null) {
      this._language = language
      localStorage.setItem('lang_current', language)
    } else
      this._language = localStorage.getItem('lang_current')

    this.getContent( false, (r) => localStorage.setItem('lang_content', r) )
  }

  set language(language) {
    if(language != this._language) {
      localStorage.setItem('lang_current', language)
      this._language = localStorage.getItem('lang_current')
      this.getContent( false, (r) => localStorage.setItem('lang_content', r) )
      window.location.reload()
    }
  }

  get content() {
    return JSON.parse( localStorage.getItem('lang_content') )
  }


  getContent(ass, callback) {
    let url =  this._path + '/' + this._language + '.json'
    let rawFile = new XMLHttpRequest()

    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", url, ass)
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200")
        callback(rawFile.responseText)
      else
        callback('{}')
    }
    rawFile.send(null);
  }
}

const multi = new MultiLanguage()

MultiLanguage.install = function(Vue, {path, d_language}){

  multi.init(path, d_language)

  Vue.prototype.changeLanguage = function(newLang) {
   multi.language = newLang
  }

  Vue.prototype.l = function(value, _params = null) {
    let content = multi.content, params = [], param, bind = [], attrs

    if(value.indexOf('|') !== -1) {
      bind = value.split('|')
      for (attrs of bind) {
        params = attrs.split('.')

        for (param of params) {
          if(content.hasOwnProperty(param))
            content = content[param]
          else
            content = multi.content
        }

        if(typeof content == 'string')
          break;

      }
    } else {
      params = value.split('.')
      for (param of params) {
        if(content.hasOwnProperty(param))
          content = content[param]
        else
          return;
      }
    }


    if(typeof _params == 'object')
      content = content.format(..._params)

    return (typeof content == 'string') ? content : ''
  }

  Vue.l = Vue.prototype.l

  Vue.changeLanguage = Vue.prototype.changeLanguage

}

export default MultiLanguage

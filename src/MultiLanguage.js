"use strict"
 
 class MultiLanguage {
 
   init(path, language) {
     this._path = path
     this._language = language
 
     this.getContent( false, (r) => sessionStorage.setItem('vue_mlang', JSON.parse(r)) )
   }
 
   set language(language) {
     if(language != this._language) {
       this._language = language
       this.getContent( false, (r) => sessionStorage.setItem('vue_mlang', JSON.parse(r)) )
     }
   }
 
   get content() {
     return sessionStorage.getItem('vue_mlang')
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
 
  Vue.prototype.l = function(value) {
     let content = multi.content, params = [], param, bind = [], attr
 
    if(value.indexOf('|') > -1) {
      bind = value.split('|')
      for (attr of bind) {
        params = attr.split('.')
        let v = true;
        for (param of params) {
          if(content.hasOwnProperty(param))
            content = content[param]
          else {
            v = false;
            return;
          }
        }

        if(v)
          return;
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
     
    return (typeof content == 'string') ? content : ''
   }
 
 }
 
 export default MultiLanguage
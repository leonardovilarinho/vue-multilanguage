"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiLanguage = function () {
  function MultiLanguage() {
    _classCallCheck(this, MultiLanguage);
  }

  _createClass(MultiLanguage, [{
    key: 'init',


    /* constructor, setter languages object */
    value: function init(_languages, _vue) {
      this.defaultLanguage = '';
      this.languages = _languages;
      this.vue = _vue;

      var userLang = void 0;

      if (_languages.default) {
        this.defaultLanguage = _languages.default;
        delete _languages.default;
        /* set current language from default */
        userLang = this.matchLanguage(this.defaultLanguage);
      }
      /* if we're in a browser */
      var isBrowser = false;
      try {
        isBrowser = typeof navigator !== 'undefined';
      } catch (e) {}

      if (!userLang && isBrowser) {
        userLang = navigator.language || navigator.userLanguage;
        userLang = this.matchLanguage(userLang) || this.matchLanguage(userLang.substr(0, 2));
      }

      if (!userLang) userLang = Object.keys(this.languages)[0];

      this.userLang = userLang;

      if (localStorage.getItem('vue-lang') !== null) this.userLang = localStorage.getItem('vue-lang');

      window.localStorage.setItem('vue-lang', this.userLang);
    }
  }, {
    key: 'relaunchByDirective',
    value: function relaunchByDirective(el, binding, vnode) {
      var hasParams = typeof binding.value !== 'undefined';
      var current = void 0,
          params = [];

      if (hasParams) {
        params = binding.value;

        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') params = [params];
      }

      function getLanguage(current) {
        if (!current) return;

        var find = current;

        Object.keys(binding.modifiers).forEach(function (path) {
          var f = find[path.trim()];
          if (f) find = f;
        });

        return typeof find === 'string' ? find : '';
      }

      if (!vnode.context.$options.messages || !(current = getLanguage(vnode.context.$options.messages[vnode.context.language]))) current = getLanguage(this.languages[vnode.context.language]);

      if (!current) {
        var val = el.innerHTML.trim();
        if (val !== '') {
          if (!vnode.context.$options.messages) vnode.context.$options.messages = {};

          var optionPath = vnode.context.$options.messages[vnode.context.language];

          if (!optionPath) optionPath = vnode.context.$options.messages[vnode.context.language] = {};

          var modifiers = Object.keys(binding.modifiers);

          modifiers.forEach(function (path, idx) {
            if (idx + 1 === modifiers.length) {
              optionPath[path] = {};
              optionPath = optionPath[path];
            } else optionPath[path] = val;
          });

          current = val;
        }
      }

      if (current && hasParams) {
        Object.keys(params).forEach(function (path) {
          current = current.replace('{' + path + '}', params[path]);
        });
      }

      el.innerHTML = current;
    }
  }, {
    key: 'search',
    value: function search(current, path, params) {

      if (path.indexOf('.') !== -1) path = path.split('.');else path = [path];

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) != 'object') params = [params];

      var find = current;
      path.forEach(function (p) {
        return find = find[p.trim()];
      });

      Object.keys(params).forEach(function (path) {
        find = find.replace('{' + path + '}', params[path]);
      });

      return find;
    }
  }, {
    key: 'matchLanguage',
    value: function matchLanguage(lang) {
      if (!lang) return '';
      var match = '';
      Object.keys(this.languages).forEach(function (path) {
        path = path.toLowerCase();
        if (lang.toLowerCase() === path) match = path;
      });

      return match;
    }
  }]);

  return MultiLanguage;
}();

var multi = new MultiLanguage();

/* Register in VueJS 2, receive path from language and default language*/
MultiLanguage.install = function (Vue, languages) {

  var bus = new Vue();
  multi.init(languages, Vue);

  Vue.mixin({
    data: function data() {
      return { language: multi.defaultLanguage };
    },

    watch: {
      language: function language(value) {
        multi.defaultLanguage = value;
        bus.$emit('lang-changed', multi.defaultLanguage);
        this.$forceUpdate();
      }
    },
    mounted: function mounted() {
      var _this = this;

      bus.$on('lang-changed', function (language) {
        return _this.language = language;
      });
    },

    methods: {
      translate: function translate(path) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var result = '';

        if (this.$options.messages && this.$options.messages[this.language]) result = multi.search(this.$options.messages[this.language], path, params);

        if (!result) result = multi.search(multi.languages[this.language], path, params);
        return result;
      }
    }
  });

  /* create directive, change content with modifications in components */
  Vue.directive('lang', {
    bind: function bind(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      multi.relaunchByDirective(el, binding, vnode);
    }
  });
};

/* export my class */
exports.default = MultiLanguage;

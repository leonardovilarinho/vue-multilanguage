'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue, initial) {
  Vue.directive('ml', {
    bind: function bind(el, binding, vnode) {
      var component = vnode.context;
      var changeTextBinding = function changeTextBinding(msg) {
        var variables = (msg.match(/\{(.*?)\}/gm) || []).map(function (v) {
          return v.replace('{', '').replace('}', '').trim();
        });
        if (variables.length <= 0) return msg;

        variables.forEach(function (variable) {
          var croped = variable.split('.');
          var instance = component;
          croped.forEach(function (part) {
            if (part in instance) {
              instance = instance[part];
            }
          });

          msg = msg.replace('{' + variable + '}', instance);
        });

        return msg;
      };

      el.setAttribute('data-ml-initial', el.innerText);
      el.innerText = changeTextBinding(el.getAttribute('data-ml-initial'));

      var actionToChange = function actionToChange() {
        var path = Object.keys(binding.modifiers).join('.');
        var current = component.$ml.current;
        var isInitial = current === initial;

        if (isInitial && el.innerText !== '') {
          el.innerText = changeTextBinding(el.getAttribute('data-ml-initial'));
          return;
        }

        Object.keys(binding.value || {}).forEach(function (name) {
          component.$ml.with(name, component[name]);
        });

        el.innerText = component.$ml.get(path);
        component.$forceUpdate();
      };

      component.$ml.bus.$on('vueml-language-changed', actionToChange);
      component.$ml.bus.$on('vueml-force-reload', actionToChange);
      el.removeEventListener('change', actionToChange);
      el.addEventListener('change', actionToChange);
    }
  });
};
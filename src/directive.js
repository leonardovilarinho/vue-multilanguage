export default (Vue, initial) => {
  Vue.directive('ml', {
    bind(el, binding, vnode) {
      const component = vnode.context
      const changeTextBinding = msg => {
        const variables = (msg.match(/\{(.*?)\}/gm) || []).map(v => v.replace('{', '').replace('}', '').trim())
        if (variables.length <= 0) return msg

        variables.forEach(variable => {
          const croped = variable.split('.')
          let instance = component
          croped.forEach(part => {
            if (part in instance) {
              instance = instance[part]
            }
          })

          msg = msg.replace(`{${variable}}`, instance)
        })

        return msg
      }

      el.setAttribute('data-ml-initial', el.innerText)
      el.innerText = changeTextBinding(el.getAttribute('data-ml-initial'))

      const actionToChange = () => {
        const path = Object.keys(binding.modifiers).join('.')
        const current = component.$ml.current
        const isInitial = current === initial

        if (isInitial && el.innerText !== '') {
          el.innerText = changeTextBinding(el.getAttribute('data-ml-initial'))
          return
        }

        Object.keys(binding.value || {}).forEach(name => {
          component.$ml.with(name, component[name])
        })

        el.innerText = component.$ml.get(path)
        component.$forceUpdate()
      }

      component.$ml.bus.$on('vueml-language-changed',actionToChange)
      component.$ml.bus.$on('vueml-force-reload',actionToChange)
      el.removeEventListener('change', actionToChange)
      el.addEventListener('change', actionToChange)
    }
  })
}
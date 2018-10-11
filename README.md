# vue-multilanguage: control of languages in vuejs

> We will help you to control the languages in your app for yours components

## Installation

```bash
# yarn
yarn add vue-multilanguage
# npm
npm install vue-multilanguage --save
```

## Get Started

Create the `ml.js` file to define your multilanguage settings and languages:

```javascript
import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      title: 'Hello {0}!',
      msg: 'You have {f} friends and {l} likes'
    }),

    new MLanguage('portuguese').create({
      title: 'Oi {0}!',
      msg: 'Você tem {f} amigos e {l} curtidas'
    })
  ]
})
```

More details:

- **MLInstaller**: plugin class for install in Vue with Vue.use
- **MLCreate**: class to define acl settings
  - **initial**: first language, for startup with your app
  - **save**: save current language in localStorage
  - **languages**: array with your languages supported
- **MLanguage**: class with language generator, create your language with it
  - **create**: method for create language based in object param

You can define a middleware for execute before all `get` call. Use this for custom structure app, e.g:

```javascript
export default new MLCreate({
  ...
  middleware: (component, path) => {
    const newPath = `${component.$options.name}.${path}`
    // you should return newPath
    return newPath
  }
})
```

PS: in example, all `$ml.get` call go concate path with component name.

For finish, in your `main.js` import the `ml`:

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './ml'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## Use in components

You can define messages inside your component, use computed propertis with prefix `ml`

```html
<template>
  <div id="app">
    <p v-text="$ml.get('myMessage')" />
  </div>
</template>

<script>
import { MLBuilder } from 'vue-multilanguage'

export default {
  name: 'app',
  data () {
    return { friends: 5 }
  },
  computed: {
    mlmyMessage () {
      return new MLBuilder('msg').with('f', this.friends).with('l', 406)
    }
  }
}
</script>
```

You can also get message direct in template:

```html
<h1 v-text="$ml.with('VueJS').get('title')" />
```

E.g: display 'Hello VueJS'.

You can get list language in any component using `list` property:

```html
<button
	v-for="lang in $ml.list"
	:key="lang"
	v-text="lang"
/>
```

Finish, you can change current language in any component using `change` method:

```html
<button
	v-for="lang in $ml.list"
	:key="lang"
	@click="$ml.change(lang)"
	v-text="lang"
/>
```
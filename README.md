# Multi-Language plugin for Vue.js

> A very easy-to-use Vue.js plugin that provides multi-language support

### Dependencies
- Vue.js 2.0+

### Installation
We have two methods of installation; you can use `npm` or a standalone.

#### To install with NPM

Use the following command to install as a dependency:

	npm install vue-multilanguage --save

#### For standalone installation

To install, just copy the file `src/vue-multilanguage.js` to your plugins directory.


### Get Started

Import MultiLanguage plugin and register it in the Vue globally:

```js
import MultiLanguage from 'vue-multilanguage'

Vue.use(MultiLanguage, {
	default: 'en',
	en: {
		hi: 'Hello',
		welcome: 'Welcome, {name}'
	},
	pt: {
		hi: 'Olá',
		welcome: 'Bem-vindo, {name}'
	},
})
```
> **NOTE**: the plugin receives an object with the supported languages and its messages.

### Using in Components

In your components use the `v-lang` directive to request a translation, sending as modifiers the path of the text you want to display.
```html
<p v-lang.hi></p>
```
If the message to be displayed has parameters like `{name}`, send its values as the policy value.
```html
<p v-lang.welcome="{name: 'Vue.JS'}"></p>
```

We can also define unnamed parameters, using `{0}`, so in the directive we would pass only the value to be exchanged, and no longer an object.

#### Embedding messages in components

Sometimes it's easier to use the component model of Vue to manage your languages. You can set local messages in your `.vue` file like:

```html
<template>
	<p v-lang.hi></p>
</template>
<script>
	export default {
		data() { return {} }
		messages: {
			en: {
				hi: 'Hello'
			},
			pt: {
				hi: 'Olá'
			}
		}
	}
</script>
```

The vue-multilanguage plugin will first look at the `messages` option in the local component before looking at globally-defined messages.


### Programmatic Usage

There is a `translate` method that you can use to retrieve a translation. For example:

```js
computed: {
	welcome()  {
		return this.translate('welcome', 'Vue.JS')
	}
}
```

### Change the current language

To change the language currently used by the system, change the `language` option value to any of its components, for example:

```js
this.language = 'en'
```

If you don't set a default language on the language object, the default language will be automatically picked up in the client browser. If no language can still be found or you're in a JavaScript environment outside the browser (such as Node.js), then the default language becomes the first language listed.

	this.language = 'en'



### LocalStorage

As of version 2.2.3 of vue-multilanguage, we are writing the current language in the `vue-lang` variable of the localStorage, causing even the page refresh language to remain active.

### Contributing

To help in the development and expansion of this repository take a FORK to your account, after you have made your modifications do a PULL REQUEST, it will be parsed and included here since it helps the plugin.

Before your PR, run `npm run build` to transpile ES6 to ES5 file.

You can still contribute to the documentation, although your little one, support new languages, if you see something wrong in English correct it :)

Thank you for contributing!
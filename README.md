# Multi-Language plugin for Vue.js

> A very easy-to-use Vue.js plugin that provides multi-language support

### Dependencies
- VueJS 2.0+

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

You can also embed the default language directly in your markup! This can save you a lot of time if you are translating an existing site that didn't previously have localization.

```html
<template>
	<p v-lang.hi>Hello</p>
</template>
<script>
	export default {
		data() { return {} }
		messages: {
			pt: {
				hi: 'Olá'
			}
		}
	}
</script>
```

Note that you can still use substitutions when defining default messages from your markup.

```html
<template>
	<p v-lang.welcome="{name: 'Vue.JS'}">Welcome, {name}</p>
</template>
<script>
	export default {
		data() { return {} }
		messages: {
			pt: {
				welcome: 'Bem-vindo, {name}'
			}
		}
	}
</script>
```


### Programmatic Usage

There is a `translate` method that you can use to retrieve a translation. For example:

```js
computed: {
	welcome()  {
		return this.translate(this.$language, 'welcome', 'Vue.JS')
	}
}
```
To change the language currently used by the system, change the `$ language` option value to any of its components, for example:
```js
this.$language = 'en'
```
If you don't set a default language on the language object, the default language will be automatically picked up in the client browser. If no language can still be found or you're in a JavaScript environment outside the browser (such as Node.js), then the default language becomes the first language listed.

### Contributing

To help in the development and expansion of this repository take a FORK to your account, after you have made your modifications do a PULL REQUEST, it will be parsed and included here since it helps the plugin.

We have an example inside this repository, to execute it, run the commands:

	npm run demo:install
	npm run demo

Write your modifications to the es6.js file, using ES2015, use the following site to generate es5.js:

https://babeljs.io/repl

You can still contribute to the documentation, although your little one, support new languages, if you see something wrong in English correct it :)

Thank you for contributing!
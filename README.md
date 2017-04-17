# MultiLanguage plugin to VueJS 2

> Plugin in order to propose a multi-language support in version 2 of VueJS

### Dependencies
- VueJS version 2

### Installation
We have two methods of installed, you can use the `npm` or a standalone.

#### To install with NPM

Use the following command to install as dependency:

	npm install vue-multilanguage --save

#### For standalone installation

To install just copy the file `src/es6.js` to your plugins directory.


### Get Started

**[1]:** Import MultiLanguage plugin and register it in the Vue globally:

	import MultiLanguage from 'vue-multilanguage'

	Vue.use(MultiLanguage, {
		en: {
			hi: 'Hello',
			welcome: 'Welcome, {name}'
		},
		pt: {
			hi: 'Olá',
			welcome: 'Bem-vindo, {name}'
		},
	})

> **NOTE**: the plugin receives an object with the supported languages and its messages.

**[2]:** In your components use the `v-lang` directive to request a translation, sending as modifiers the path of the text you want to display.

	<p v-lang.hi></p>

If the message to be displayed has parameters like `{name}`, send its values as the policy value.

	<p v-lang.welcome="{name: 'Vue.JS'}"></p>


We can also define unnamed parameters, using `{0}`, so in the directive we would pass only the value to be exchanged, and no longer an object.

**[3]:** Finally, we still have the `translate` method that does the same as the previous directive, however it is a method, use it as computed:

	computed: {
		welcome()  {
			return this.translate(this.$language, 'welcome', 'Vue.JS')
		}
	}

**[4]:** To change the language currently used by the system, change the `$ language` option value to any of its components, for example:

	this.$language = 'en'

The default language will be automatically picked up in the client browser.

### Contributing

To help in the development and expansion of this repository take a FORK to your account, after you have made your modifications do a PULL REQUEST, it will be parsed and included here since it helps the plugin.

We have an example inside this repository, to execute it, run the commands:

	npm run demo:install
	npm run demo

Write your modifications to the es6.js file, using ES2015, use the following site to generate es5.js:

https://babeljs.io/repl

You can still contribute to the documentation, although your little one, support new languages, if you see something wrong in English correct it :)

Thank you for contributing!
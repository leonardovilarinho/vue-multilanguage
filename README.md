# MultiLanguage plugin to VueJS 2

> Plugin in order to propose a multi-language support in version 2 of VueJS

### Dependencies
- VueJS version 2
- Vuex version 2

### Installation
We have two methods of installed, you can use the `npm` or a standalone.

#### To install with NPM

Use the following command to install as dependency:

	npm install vue-multilanguage --save

#### For standalone installation

To install just copy the file `src/MultiLanguage.js` to your plugins directory.


### Get Started

**[1]:** Create in your `state` of Vuex a variable with name of `mlang`, she will store all your JSON currently active language:

	.
	.
	state: {
	  mlang: {}
	}
	.
	.

**[2]:** Import MultiLanguage plugin and register it in the Vue globally:

	import MultiLanguage from 'vue-multilanguage'
	import Store from '../vuex/store'
	Vue.use( MultiLanguage, { path: 'src/lang', d_language: 'pt', store: Store } )

> **NOTE**: the plugin should receive as parameters the directory path where will be your language files, the default language of the system and your `store` from Vuex.

**[3]:** In the language directory create JSON files for each language, for example:

Example: `src/lang/en.json`

	{
	  "hello": "The text Hello World",
	  "errors": {
		"one": "Is an example message"
	  }
	}


Example: `src/lang/pt.json`

	{
	  "hello": "Texto ola mundo"
	}

> Note that the files are different, the pt.json we left without the `errors` object, the plugin will understand as a null value.

**[4]:** In its components use the global method `l()` to get the value of a variable for the current language, as an example:

	<p>{{ l('hello') }}</p>
	<p>{{ l('errors.one') }}</p>

> For multidimensional objects use the dot (.), as well as in an object, to get internal values.

> The global method `l()` is a shortcut for the variable `$store.state.mlang`

**[5]:** To change the language currently active in the system use the global method `changeLanguage()`, passing as parameter the new language that the system uses:

	this.changeLanguage('en')


### Contributing

To help in the development and expansion of this repository take a FORK to your account, after you have made your modifications do a PULL REQUEST, it will be parsed and included here since it helps the plugin.

# MultiLanguage plugin para VueJS 2

> Esse plguin tem o objetivo de fornecer multi idiomas para um sistema feito com VueJS 2

### Dependências
- VueJS versão 2
- Vuex versão 2

### Instalação
Nós temos duas maneiras de instalar o plugin, a primeira usando o `npm` e a segunda fazendo manualmente

#### Para instalar com NPM

Use o seguinte comando para instalar o plugin como dependência:

	npm install vue-multilanguage --save

#### Para instalação standalone

Para instalar, copie o arquivo `src/MultiLanguage.js` para sua pasta de plugins.


### Começando

**[1]:** Crie em sua `state` do Vuex uma variável com nome de `mlang`, elsa servirá para armazenar JSON do idioma atualmente ativo:

	.
	.
	state: {
	  mlang: {}
	}
	.
	.

**[2]:** Importe o plugin MultiLanguage e registre-o globalmete no Vue:

	import MultiLanguage from 'vue-multilanguage'
	import Store from '../vuex/store'
	Vue.use( MultiLanguage, { path: 'src/lang', d_language: 'pt', store: Store } )

> **NOTA**: o plugin recet três parâmetros, o caminho para sua pasta com arquivos de idioma, a lingaugem padrão do sistema e sua `store` do Vuex.

**[3]:** Na pasta destinada aos arquivos de linguagem, crie um arquivo JSON para cada linguagem do sistema.

Exemplo: `src/lang/en.json`

	{
	  "hello": "The text Hello World",
	  "errors": {
		"one": "Is an example message"
	  }
	}


Exemplo: `src/lang/pt.json`

	{
	  "hello": "Texto ola mundo"
	}

> Note que os arquivos estão diferentes, no pt.json não há o objeto `errors`, quando isso acontece o plugin interpreta o valor como nulo.

**[4]:** Nos seus componentes use o método global `l()` para pegar o valor de uma variável o idioma atual do sistema, como exemplo:

	<p>{{ l('hello') }}</p>
	<p>{{ l('errors.one') }}</p>

> Pra multidimensionais use o ponto (.) para pegar valores internos, assim como usamo-os em objetos.

> O método global `l()` é um atalho para a variável `$store.state.mlang`

**[5]:** Para alterar a linguagem atualmente usada pelo sistema use o método global `changeLanguage()`, enviando como parâmetro a nova linguagem, por exemplo:

	this.changeLanguage('en')


### Contribuindo

Para ajudar no desenvolvimento e expansão desse plugin faça um FORK do repositório na sua conta do GitHub, quando realizar as modificações faça um PULL REQUEST, iremos analisar se houve uma melhoria com a modificaçao, se sim então elas estará presente aqui.

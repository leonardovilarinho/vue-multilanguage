# MultiLanguage plugin para VueJS 2

> Esse plugin tem o objetivo de fornecer multi idiomas para um sistema feito com VueJS 2

### Dependências
- VueJS versão 2

### Instalação
Nós temos duas maneiras de instalar o plugin, a primeira usando o `npm` e a segunda fazendo manualmente

#### Para instalar com NPM

Use o seguinte comando para instalar o plugin como dependência:

	npm install vue-multilanguage --save

#### Para instalação standalone

Para instalar, copie o arquivo `src/es6.js` para sua pasta de plugins.


### Começando

**[1]:** Importe o plugin MultiLanguage e registre-o globalmente no Vue:

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

> **NOTA**: o plugin recebe um objeto com os idiomas suportados e suas mensagens.


**[2]:** Nos seus componentes use a diretiva `v-lang` para solicitar uma tradução, enviando como modificadores o caminho do texto que você quer exibir.

	<p v-lang.hi></p>

Caso a mensagem a ser exibida tenha parâmetros como `{name}`, envie os respectivos valores como valor da diretiva.

	<p v-lang.welcome="{name: 'Vue.JS'}"></p>

Podemos ainda definir parâmetros sem nome, usando `{0}`, assim na diretiva passaríamos apenas o valor a ser trocado, e não mais um objeto.

**[3]:** Por fim, ainda temos o método `translate` que faz o mesmo que a diretiva anterior, porém é um método, use-o como computed:

	computed: {
		welcome()  {
			return this.translate(this.$language, 'welcome', 'Vue.JS')
		}
	}

**[4]:** Para alterar a linguagem atualmente usada pelo sistema altere o valor da opção `$language` em qualquer um de seus componentes por exemplo:

	this.$language = 'en'

A linguagem padrão será pega automaticamente no navegador do cliente.

### Contribuindo

Para ajudar no desenvolvimento e expansão desse plugin faça um FORK do repositório na sua conta do GitHub, quando realizar as modificações faça um PULL REQUEST, iremos analisar se houve uma melhoria com a modificação, se sim então elas estará presente aqui.

Temos um exemplo dentro desse repositório, para executa-lo, rode os comandos:

	npm run demo:install
	npm run demo

Escreva suas modificações no arquivo es6.js, usando o ES2015, use o seguinte site para gerar o es5.js:

https://babeljs.io/repl

Você pode ainda contribuir com a documentação, apesar de seu pequena, dê suporte a novas linguagens, caso veja algo de errado no inglês corrija :)

Obrigado por contribuir!
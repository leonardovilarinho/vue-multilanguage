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
		default: 'pt',
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

### Usando em componentes
Nos seus componentes use a diretiva `v-lang` para solicitar uma tradução, enviando como modificadores o caminho do texto que você quer exibir.

	<p v-lang.hi></p>

Caso a mensagem a ser exibida tenha parâmetros como `{name}`, envie os respectivos valores como valor da diretiva.

	<p v-lang.welcome="{name: 'Vue.JS'}"></p>

Podemos ainda definir parâmetros sem nome, usando `{0}`, assim na diretiva passaríamos apenas o valor a ser trocado, e não mais um objeto.


### Incorporando mensagens em componentes

Ás vezes suas mensagens são usadas em apenas um componente, pensando nisso, podemos declarar mensagens locais, no corpo do componente e usadas normalmente:

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

O plugin vue-multilanguage examinará primeiro a opção `messages` no componente local, antes de olhar para mensagens definidas globalmente.

Você também pode incorporar o idioma padrão diretamente no seu template, desde que tenha um `default` definido na configuração do plugin. Isso pode poupar muito tempo se você estiver traduzindo um site existente que anteriormente não tinha localização.

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

Note que você ainda pode usar substituições ao configurar mensagens padrão com marcações.


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

### Uso na programação
Existe um método `translate 'que você pode usar para recuperar uma tradução. Por exemplo:

```js
computed: {
	welcome()  {
		return this.translate(this.$language, 'welcome', 'Vue.JS')
	}
}
```

Para alterar a linguagem atualmente usada pelo sistema altere o valor da opção `$language` em qualquer um de seus componentes por exemplo:

	this.$language = 'en'

A linguagem padrão será pego automaticamente no navegador do cliente, caso não encontre-mos, o primeiro idioma da lista será usado.

### Contribuindo

Para ajudar no desenvolvimento e expansão desse plugin faça um FORK do repositório na sua conta do GitHub, quando realizar as modificações faça um PULL REQUEST, iremos analisar se houve uma melhoria com a modificação, se sim então elas estará presente aqui.

Temos um exemplo dentro desse repositório, para executa-lo, rode os comandos:

	npm run demo:install
	npm run demo


Você pode ainda contribuir com a documentação, apesar de seu pequena, dê suporte a novas linguagens, caso veja algo de errado no inglês corrija :)

Obrigado por contribuir!
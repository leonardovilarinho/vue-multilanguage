import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from '../../src'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      title: 'Hello {0}!',
      msg: 'You have {f} friends and {l} likes',
      fruits: ['Apple', 'Pineapple']
    }),

    new MLanguage('portuguese').create({
      title: 'Oi {0}!',
      logout: 'Olá {name}, clique aqui para sair {friends}',
      infos: {
        friends: 'Diga olá para seus amigos'
      },
      msg: 'Você tem {f} amigos e {l} curtidas',
      fruits: ['Maçã', 'Abacaxi']
    })
  ],
  middleware: (component, path) => {
    // you can mutate path here
    // you should return path updated
    return path
  },
  gettingStrategy: 'default'
})

import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from '../../src'

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
  ],
  middleware: (component, path) => {
    // you can mutate path here
    // you should return path updated
    return path
  }
})

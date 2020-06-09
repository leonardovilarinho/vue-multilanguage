<template>
  <div id="app">
    <h1 v-text="$ml.with('leo').get('title')" />

    <p v-ml.logout="{ name, friends }">Hello {name}, click to {friends} logout</p>
    <p v-ml.infos.friends>Say hello to your friends</p>

    <button @click="changeName">Troca {{ name }}</button>

    <p v-text="$ml.get('fruits')[0]" />
    <children/>
    <children/>
    <br>
    <button
      v-for="lang in $ml.list"
      :key="lang"
      @click="$ml.change(lang)"
      v-text="lang"
    />
  </div>
</template>

<script>
import { MLBuilder } from '../../src'
import Children from './Children'

export default {
  name: 'app',
  components: {
    Children
  },
  data () {
    return { friends: 5, name: 'Leonardo' }
  },
  computed: {
    myMessage () {
      return new MLBuilder('msg').with('f', this.friends).with('l', 406)
    }
  },
  methods: {
    changeName () {
      this.name = this.name === 'Guilherme' ? 'Leonardo' : 'Guilherme'
      this.$ml.bus.$emit('vueml-force-reload')
    }
  }
}
</script>

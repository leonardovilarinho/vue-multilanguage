<template>
  <div id="app">
    <h1 v-text="$ml.with('leo').get('title')" />
    <p v-text="$ml.get('myMessage')" />
    <small>{{ $ml.current }}</small>
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

export default {
  name: 'app',
  data () {
    return { friends: 5 }
  },
  computed: {
    myMessage () {
      return new MLBuilder('msg').with('f', this.friends).with('l', 406)
    }
  }
}
</script>

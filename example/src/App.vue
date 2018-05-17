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
  messages: {
    myMessage: new MLBuilder('msg').with('f', 5).with('l', 456)
  }
}
</script>

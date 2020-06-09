<template>
  <div>
    <p>1. <strong>{{ $ml.current }}</strong></p>
    <p>2. <sub-children/></p>
  </div>
</template>

<script>
import SubChildren from './SubChildren'
export default {
  components: {
    SubChildren
  }
}
</script>

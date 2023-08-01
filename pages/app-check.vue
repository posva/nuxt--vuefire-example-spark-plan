<script lang="ts" setup>
import { useAppCheckToken } from 'vuefire'

const token = useAppCheckToken()

definePageMeta({
  linkTitle: 'App Check',
  order: 8,
})
</script>

<template>
  <div>
    <h2>App Check</h2>
    <p>Token:</p>
    <pre><code>{{ token }}</code></pre>
  </div>
</template>

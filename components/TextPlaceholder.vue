<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
const width = props.text.length * 0.6 + 'em'
</script>

<template>
  <ClientOnly>
    <template #default>
      <slot>{{ text }}</slot>
    </template>
    <template #fallback>
      <span class="_content" :style="{ width }"></span>
    </template>
  </ClientOnly>
</template>

<style scoped>
._content {
  /* Avoid displaying the actual text */
  color: transparent;
  animation: linear 1s placeHolderShimmer infinite;
  /* fallback */
  background: var(--background);
  background: linear-gradient(
    to right,
    var(--background) 8%,
    var(--background-body) 18%,
    var(--background) 33%
  );
  display: inline-block;
  /* FIXME: doesn't work with SSR in Vue */
  /* width: v-bind(width); */
  line-height: 1em;
  height: 1em;
  background-size: 100vw 100%;
  clip-path: inset(0% 0% 0% 0% round 1rem);

  /* small alignment fix */
  transform: translateY(0.09em);
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -50vw 0;
  }
  100% {
    background-position: 50vw 0;
  }
}
</style>

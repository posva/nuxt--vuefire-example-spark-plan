export default defineNuxtPlugin(async (nuxt) => {
  nuxt.vueApp.directive('focus', {
    mounted(el) {
      el.focus()
    },
  })
})

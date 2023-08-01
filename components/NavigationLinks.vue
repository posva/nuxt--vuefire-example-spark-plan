<script lang="ts" setup>
const router = useRouter()
const routes = computed(() =>
  router
    .getRoutes()
    .filter((route) => !route.path.includes(':') && route.meta.linkTitle)
    .sort((a, b) => (Number(a.meta.order) || 0) - (Number(b.meta.order) || 0))
    .map((route) => ({
      to: route.name ? { name: route.name } : route.path,
      text: route.meta.linkTitle || route.name || route.path,
    }))
)
</script>

<template>
  <nav class="links">
    <ul>
      <li v-for="route in routes">
        <NuxtLink :to="route.to" v-slot="{ href }">{{
          route.text || href
        }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav.links ul {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
}

nav.links li a {
  position: relative;
  display: block;
  text-align: center;
  padding: 8px 12px;

  --background: var(--background-alt);
}

nav.links li a::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 75%;
  left: 0.2em;
  right: 0.2em;
  bottom: 10%;
  transition: top 200ms ease-out, background-color 200ms ease-out;
  background-color: var(--background);
  border-radius: 0.35em;
}

nav.links li a:hover::after {
  top: 10%;
  background-color: var(--background);
}

.router-link-active {
  color: #00dc82;
}
nav.links li a.router-link-active::after {
  top: 75%;
  --background: var(--border);
}

nav.links > ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  justify-items: center;
  max-width: 1000px; /* Optional: set a max width for the grid */
  margin: 0 auto; /* Optional: center the grid horizontally */
}

.links li {
  width: 150px;
  block-size: fit-content;
}
</style>

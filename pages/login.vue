<script lang="ts">
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script lang="ts" setup>
import {
  getRedirectResult,
  signInAnonymously,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'

definePageMeta({
  linkTitle: 'Login',
  order: 2,
})

const auth = useFirebaseAuth()! // only exists on client side
const user = useCurrentUser()
const isUserLoaded = useIsCurrentUserLoaded()
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinPopup', reason)
    error.value = reason
  })
}

// display errors if any
const error = ref<Error | null>(null)
// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})

const route = useRoute()
</script>

<template>
  <main>
    <h2>Login</h2>

    <ClientOnly>
      <p v-if="!isUserLoaded">Loading</p>
    </ClientOnly>

    <ErrorBox v-if="error" :error="error" />

    <div v-else-if="route.query.redirect" class="message-box">
      <p>
        Please login to access <code>{{ route.query.redirect }}</code
        >.
      </p>
    </div>

    <template v-if="user">
      <div>
        You are currently logged in as:
        <br />
        <img
          class="avatar"
          v-if="user.photoURL"
          :src="user.photoURL"
          referrerpolicy="no-referrer"
        />
        <br />
        <strong
          >{{ user.isAnonymous ? '🥸' : '' }} {{ user.displayName }}.</strong
        >
      </div>

      <button @click="signOut(auth)">Logout</button>
    </template>

    <template v-else>
      <button @click="signinRedirect()">SignIn with Google (redirect)</button>
      <br />
      <button @click="signinPopup()">SignIn with Google (popup)</button>
      <!-- <br /> -->
      <!-- <button @click="signInAnonymously(auth)">SignIn Anonymously</button> -->
    </template>
  </main>
</template>

<style scoped>
.avatar {
  padding: 1em 0;
}

main > button {
  margin: 1em 0;
}
</style>

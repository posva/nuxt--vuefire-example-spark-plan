<script lang="ts" setup>
import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics'

// Analytics can only be retrieved on the client
const analytics = () => getAnalytics(useFirebaseApp())
const user = useCurrentUser()

definePageMeta({
  linkTitle: 'Analytics',
  order: 9,
})
</script>

<template>
  <main>
    <h2>Analytics</h2>
    <p>
      This page is using
      <a href="https://firebase.google.com/docs/analytics">Firebase Analytics</a
      >.
    </p>
    <button @click="setAnalyticsCollectionEnabled(analytics(), true)">
      Enable Analytics Collection
    </button>
    <button @click="setAnalyticsCollectionEnabled(analytics(), false)">
      Disable Analytics Collection
    </button>
    <p>
      <button
        @click="
          logEvent(analytics(), 'generate_lead', {
            user: user?.uid,
          })
        "
      >
        Log a generate_lead event
      </button>
    </p>
  </main>
</template>

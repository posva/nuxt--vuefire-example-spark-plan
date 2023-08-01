<script lang="ts" setup>
import { useFirebaseStorage, useStorageFile, useCurrentUser } from 'vuefire'
import { deleteObject, ref as storageRef } from 'firebase/storage'

definePageMeta({
  linkTitle: 'Storage',
  order: 7,
})

const filename = ref<string>()
const { files, open } = useFileDialog()

// automatically set the filename when a file is selected
watch(
  () => files.value?.item(0)?.name,
  (name) => {
    // avoid clearing out the filename
    if (name && !filename.value) {
      filename.value = name
    }
  }
)

const user = useCurrentUser()

const storage = useFirebaseStorage()
const storageBucket = () =>
  storageRef(storage, 'demo/' + (user.value?.uid || ''))
const storageSource = computed(() =>
  filename.value ? storageRef(storageBucket(), filename.value) : null
)

const {
  upload,
  uploadProgress: progress,
  uploadError: error,
  url,
  snapshot,
  uploadTask,
  metadata,
} = useStorageFile(storageSource)

function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    upload(data)
  }
}
</script>

<template>
  <h2>Storage</h2>

  <form @submit.prevent="uploadPicture">
    <fieldset :disabled="!!uploadTask">
      <button
        type="button"
        @click="open({ accept: 'image/*', multiple: false })"
      >
        <template v-if="files?.length">
          Selected file: {{ files.item(0)!.name }} (Click to select another)
        </template>
        <template v-else> Select one picture.</template>
      </button>

      <br />

      <label>
        Filename to use (leave blank to auto generate)
        <input type="text" v-model="filename" />
      </label>

      <br />

      <button>Upload</button>
    </fieldset>
  </form>

  <ErrorBox v-if="error" :error="error" />

  <div v-else-if="progress != null">
    <div>Progress {{ progress * 100 }}%</div>
    <progress max="1" :value="progress">{{ progress * 100 }}%</progress>
  </div>

  <p v-if="url">
    <img :src="url" />
  </p>
  <p v-if="snapshot">File: {{ snapshot.ref.name }}</p>
  <pre v-if="metadata"><code>{{  metadata }}</code></pre>

  <p v-if="storageSource">Select a new file to update it.</p>
  <p v-else>Select a picture to delete.</p>
  <button @click="deleteObject(storageSource!)" :disabled="!storageSource">
    Delete the picture
  </button>
</template>

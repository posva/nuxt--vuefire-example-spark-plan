<script lang="ts" setup>
export interface Todo {
  created: Date
  updated: Date | null
  finished: boolean
  text: string
  /**
   * User who created the todo
   */
  uid: string | undefined
  /**
   * User who last updated the todo. `null` if never updated.
   */
  updatedBy: string | undefined | null
}

const props = defineProps<{
  todo: Todo & { id: string }
}>()

const emit = defineEmits<{
  (event: 'update:todo', id: string, newTodo: Todo): void
  (event: 'delete', id: string): void
}>()

const isEditing = ref(false)
const textCopy = ref('')

function startEdit() {
  textCopy.value = props.todo.text
  isEditing.value = true
}

function saveTodo() {
  if (!isEditing.value) {
    return
  }

  emit('update:todo', props.todo.id, {
    ...props.todo,
    text: textCopy.value,
  })

  isEditing.value = false
}

const finished = computed({
  get: () => props.todo.finished,
  set(finished) {
    emit('update:todo', props.todo.id, { ...props.todo, finished })
  },
})

async function lostFocus() {
  await nextTick()
  saveTodo()
}
</script>

<template>
  <li>
    <form v-if="isEditing" @submit.prevent="saveTodo">
      <input
        v-model="textCopy"
        v-focus
        type="text"
        @keydown.esc="isEditing = false"
        @blur="lostFocus"
      />
      <button>Save</button>
      <button type="button" @click="isEditing = false">Cancel</button>
    </form>
    <div v-else class="todo-container">
      <input v-model="finished" type="checkbox" />
      <span
        :class="todo.finished ? 'line-through' : ''"
        @dblclick="startEdit"
        >{{ todo.text }}</span
      >
      <button @click="$emit('delete', todo.id)">Delete</button>
    </div>
  </li>
</template>

<style scoped>
.todo-container {
  display: flex;
  align-items: baseline;
}
</style>

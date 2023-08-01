<script setup lang="ts">
import {
  push,
  remove,
  ref as dbRef,
  serverTimestamp,
  update,
  query,
  equalTo,
  orderByChild,
} from 'firebase/database'
import { useDatabase, useDatabaseList } from 'vuefire'
import type { Todo } from '~/components/TodoItem.vue'

definePageMeta({
  linkTitle: 'Database',
  order: 3,
})

const db = useDatabase()
const user = useCurrentUser()
const todosRef = dbRef(db, 'todos')
// Firebase Database only allows one filter in query
const finishedTodos = query(todosRef, orderByChild('finished'), equalTo(true))
const unfinishedTodos = query(
  todosRef,
  orderByChild('finished'),
  equalTo(false)
)

const filter = ref<'all' | 'finished' | 'unfinished'>('all')
const onlyShowMyTodos = ref(false)
watch(onlyShowMyTodos, (value) => {
  // we cannot apply the filter anyway
  if (value) {
    filter.value = 'all'
  }
})

const filteredTodos = computed(() => {
  if (onlyShowMyTodos.value && user.value?.uid) {
    return query(todosRef, orderByChild('uid'), equalTo(user.value?.uid))
  }

  if (filter.value === 'finished') {
    return finishedTodos
  }
  if (filter.value === 'unfinished') {
    return unfinishedTodos
  }
  return todosRef
})

const { data: todos, pending } = useDatabaseList<Todo>(filteredTodos)

const newTodoText = ref('')

function addTodo() {
  if (newTodoText.value) {
    push(todosRef, {
      text: newTodoText.value,
      finished: false,
      created: serverTimestamp(),
      updated: null,
      uid: user.value?.uid || null, // cannot be undefined for Firebase
      updatedBy: null, // never updated
    })
    newTodoText.value = ''
  }
}

function updateTodo(id: string, newTodo: Todo) {
  update(dbRef(db, 'todos/' + id), {
    ...newTodo,
    updatedBy: user.value?.uid || null, // cannot be undefined for Firebase
    updated: serverTimestamp(),
  })
}

function removeTodo(id: string) {
  remove(dbRef(db, 'todos/' + id))
}
</script>

<template>
  <main>
    <h2>Realtime Database Todo List</h2>

    <p>Loading: {{ pending }}</p>

    <fieldset>
      <label>Filter:</label>

      <label>
        <input type="radio" value="all" v-model="filter" />
        All
      </label>
      <label>
        <input type="radio" value="finished" v-model="filter" />
        Finished
      </label>
      <label>
        <input type="radio" value="unfinished" v-model="filter" />
        Unfinished
      </label>

      <br />

      <label>
        <input type="checkbox" :disabled="!user" v-model="onlyShowMyTodos" />
        Only show my todos
        <template v-if="!user">
          (<NuxtLink
            :to="{ name: 'login', query: { redirect: $route.fullPath } }"
            >Login</NuxtLink
          >
          to enable this)
        </template>
      </label>
    </fieldset>

    <form @submit.prevent="addTodo">
      <input v-model.trim="newTodoText" placeholder="Add new todo" />
      <button>Add Todo</button>
    </form>
    <TransitionGroup tag="ul" name="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="removeTodo"
        @update:todo="updateTodo"
      />
    </TransitionGroup>
  </main>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

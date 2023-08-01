<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: String,
  label: String,
  maxlength: [Number, String],
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const text = computed({
  get: () => props.modelValue,
  set(value: string) {
    emit('update:modelValue', value)
  },
})

const maxLengthColor = computed(() => {
  if (props.modelValue.length > Number(props.maxlength) * 0.9) return 'red'
  if (props.modelValue.length > Number(props.maxlength) * 0.8) return 'orange'
})
</script>

<template>
  <label v-if="label" :for="id">{{ label }}</label>

  <textarea
    v-bind="$attrs"
    :id="id"
    v-model="text"
    :maxlength="maxlength"
  ></textarea>

  <div class="max-length" v-if="maxlength" :class="maxLengthColor">
    {{ modelValue.length }} / {{ maxlength }}
  </div>
</template>

<style scoped>
.max-length {
  font-size: 0.7rem;
  text-align: right;
}

.red {
  color: crimson;
}
.orange {
  color: orange;
}
</style>

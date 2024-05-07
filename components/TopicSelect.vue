<template>
  <ElSelect v-model="value" placeholder="Select a topic" :filterable="true" :default-first-option="true" class="w-full"
    @change="handleChange">
    <ElOption v-for="topic in topics" :key="topic.id" :label="topic.label" :value="topic.id" />
  </ElSelect>
</template>

<script setup lang="ts">
import type { Topic } from '../types'
import { useMainStore } from '../stores/mainStore'

const mainStore = useMainStore()

const emits = defineEmits(['update:topic'])

const props = defineProps({
  topic: {
    type: String,
    required: true
  }
})

const value = ref<string>(mainStore.getTopic ?? props.topic)
const baseTopics = [
  {
    id: 'javascript',
    label: 'JavaScript'
  },
  {
    id: 'computerscience',
    label: 'Computer Science'
  },
  {
    id: 'worldnews',
    label: 'World News'
  },
  {
    id: 'showerthoughts',
    label: 'Shower Thoughts'
  },
  {
    id: 'writingprompts',
    label: 'Writing Prompts'
  }
]

// const topics = ref<Array<Topic>>(baseTopics)
const topics = computed(() => {
  return baseTopics.concat(mainStore.topics)
})

watch(() => mainStore.topics, (value) => {
  console.log('value', value)
}, { deep: true })

const handleChange = (value: string) => {
  emits('update:topic', value)
  mainStore.setTopic(value)
}
</script>
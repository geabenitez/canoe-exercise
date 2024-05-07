<template>
  <ElSelect v-model="value" placeholder="Select a topic" :filterable="true" :default-first-option="true" class="w-full"
    @change="emit('change', value)">
    <ElOption v-for="topic in options" :key="topic.id" :label="topic.label" :value="topic.id" />
  </ElSelect>
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
const value = ref<string>('a-z')
const options = [
  {
    id: 'a-z',
    label: 'Topic: A to Z'
  },
  {
    id: 'z-a',
    label: 'Topic: Z to A'
  },
  {
    id: 'n-o',
    label: 'Newest to Oldest'
  },
  {
    id: 'o-n',
    label: 'Oldest to Newest'
  }
]
</script>
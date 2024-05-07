<template>
  <UserDialog :visible="showUserDialog" :user="selectedUser" />
  <article
    class="p-2 md:p-3 lg:p-4 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-400 hover:scale-105 transition-transform duration-150 cursor-pointer"
    @click="handleClick(post?.data.url as string)">
    <div class="flex flex-col justify-between h-40">
      <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
        <h2 class="text-sm md:text-base lg:text-lg font-bold tracking-tight text-gray-900">
          <ElTooltip :content="post?.data.title" :show-after="500" placement="top">
            {{ useTruncate(post?.data.title, { length: 50, separator: ' ' }) }}
          </ElTooltip>
        </h2>
        <p class="font-light text-xs md:text-sm text-gray-500">
          {{ useTruncate(post?.data.selftext || '** No description **', { length: 100, separator: ' ' }) }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-2 text-gray-500">
        <span class="text-xs md:text-sm inline-flex items-center font-medium text-blue-600 hover:underline" @click.stop="handleUserClick">
          {{ post?.data.author }}
        </span>
        <span class="text-xs">{{ age }} ago</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '../types'
import { formatDistance } from 'date-fns';

const showUserDialog = ref(false)
const selectedUser = ref('')

// Define the props for the component
const props = defineProps({
  post: Object as PropType<Post>,
  default: () => ({})
})

// Compute the age of the post
const age = computed(() => {
  const postDate = new Date((props.post?.data.created || 0) * 1000)
  const currentDate = new Date()
  return formatDistance(postDate, currentDate)
})

const handleClick = (url: string) => {
  ElMessageBox.confirm('Are you sure you would like to navigate outside this page?', 'Warning', {
    type: 'warning'
  })
    .then(() => {
      navigateTo(url, { external: true, open: { target: '_blank' } })
    })
}

const handleUserClick = () => {
  selectedUser.value = props.post?.data.author || ''
  showUserDialog.value = true
}
</script>
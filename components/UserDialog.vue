<template>
  <ElDialog v-model="dialogVisible" :title="user" width="1100" @close="dialogVisible = false">
    <ElTable :data="posts" v-loading="loading">
      <ElTableColumn type="selection" width="50" />
      <ElTableColumn type="index" label="No." width="50" />
      <ElTableColumn prop="created" label="Date" width="180">
        <template #default="{ row }">
          <span>{{ format(new Date(row.created * 1000), 'MM/dd/yyyy HH:mm:ss') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="link_title" label="Title" />
      <ElTableColumn prop="subreddit" label="Subreddit" width="175" />
    </ElTable>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogVisible = false">Close</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import type { Listing } from '../types';
import type { PostData } from '../types';
import { format } from 'date-fns';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const loadingErrorMessage = 'Han error fetching the content of the user has occured'
const posts = ref<Array<PostData> | null>(null)
const dialogVisible = ref(props.visible)
watch(() => props.visible, (value) => {
  dialogVisible.value = value
})

const fetchData = (user: string) => {
  if (user !== '') {
    loading.value = true
    fetch(`https://www.reddit.com/user/${user}.json`)
      .then(response => response.json())
      .then((response: Listing) => {
        posts.value = response.data.children.map((child) => child.data)
      })
      .catch(() => {
        ElMessage.error(loadingErrorMessage)
      }).then(() => {
        loading.value = false
      })
  }
}

onMounted(() => {
  fetchData(props.user)
})

watch(() => props.user, (value) => {
  fetchData(value)
})
</script>
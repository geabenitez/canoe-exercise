<template>
  <AddTopic :visible="showAddTopic" @closed="showAddTopic = false" />
  <section class="bg-white">
    <div class="pt-12 py-16 px-8 mx-auto max-w-screen-xl ">
      <div class="flex flex-col mx-auto items-center mb-8 sticky top-0 py-4 bg-white border-b space-y-4">
        <h2 class="text-center text-2xl md:text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
          Canoe Intelligence - Technical Exercise
        </h2>
        <div class="flex w-full justify-between items-end">
          <div class="flex flex-col space-y-1">
            <span class="text-[11px] uppercase text-gray-500">Select a community:</span>
            <div class="flex space-x-1 w-[250px]">
              <TopicSelect :topic="topic" @update:topic="handleUpdateTopic" />
              <ElTooltip content="Add new community" placement="top">
                <ElButton type="primary" :icon="Plus" @click="showAddTopic = true" />
              </ElTooltip>
            </div>
          </div>
          <div class="flex flex-row space-x-1 items-end">
            <div class="flex ">
              <ElInput v-model="search" placeholder="Search by topic" :prefix-icon="Search" :clearable="true" />
            </div>
            <div class="flex flex-col w-40">
              <span class="text-[11px] uppercase text-gray-500">Sort by:</span>
              <TopicsFilter @change="sortBy = $event" />
            </div>
            <ElDropdown class="" split-button type="primary" trigger="click" @click="handleDownloadReport('pdf')">
              Download PDF
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem @click="handleDownloadReport('xlsx')"> Download Excel </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </div>
        </div>
      </div>
      <ElSkeleton v-if="loading" :rows="10" :animated="true" />
      <div v-else>
        <div v-if="posts" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Article v-for="post in sorted" :post="post" />
        </div>
        <div v-else class="text-center text-gray-500 font-semibold">
          {{ loadingErrorMessage }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue'
import { useMainStore } from '../stores/mainStore'
import type { Listing, Post } from '../types';
import { useDebounceFn } from '@vueuse/core';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const mainStore = useMainStore()
const topic = ref<string>(mainStore.getTopic ?? 'javascript')
const posts = ref<Listing | null>(null)
const loadingErrorMessage = 'Han error fetching the content of the topic has occured'
const loading = ref<boolean>(true)
const showAddTopic = ref<boolean>(false)
const search = ref<string>('')
const children = ref<Array<Post>>([])
const sortBy = ref<string>('a-z')

const setChildren = (posts: Listing | null, search = '', sortBy: string) => {
  if (posts) {
    children.value = posts.data.children.filter((child) => {
      return child.data.title.toLowerCase().includes(search?.toLowerCase())
    }).sort((a, b) => {
      if (sortBy === 'z-a') {
        return b.data.title.localeCompare(a.data.title)
      } else if (sortBy === 'n-o') {
        return b.data.created - a.data.created
      } else if (sortBy === 'o-n') {
        return a.data.created - b.data.created
      } else {
        return a.data.title.localeCompare(b.data.title)
      }
    })
  }
}

const fetchData = (topic: string) => {
  loading.value = true
  fetch(`https://www.reddit.com/r/${topic}.json`)
    .then(response => response.json())
    .then(data => {
      posts.value = data
      setChildren(data, search.value, sortBy.value)
    })
    .catch(() => {
      ElMessage.error(loadingErrorMessage)
    }).then(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchData(topic.value)
})

const handleUpdateTopic = (newTopic: string) => {
  topic.value = newTopic
  posts.value = null
  fetchData(newTopic)
}

watch([() => search.value, () => sortBy.value], () => {
  useDebounceFn(() => {
    setChildren(posts.value, search.value, sortBy.value)
  }, 1000)();
})

const sorted = computed(() => {
  return children.value
})

const handleDownloadReport = (type: 'pdf' | 'xlsx') => {
  console.log('Downloading report as', type)
  switch (type) {
    case 'pdf':
      const docDefinition: TDocumentDefinitions = {
        pageMargins: [20, 40, 20, 40],
        content: [
          { text: 'Canoe Intelligence - Technical Exercise', style: 'header' },
          {
            fontSize: 8.5,
            layout: 'noBorders',
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', '100'],
              body: [
                [
                  {
                    text: '#',
                    style: 'tableHeader',
                  },
                  {
                    text: 'TITLE',
                    style: 'tableHeader',
                  },
                  {
                    text: 'AUTHOR',
                    style: 'tableHeader',
                  },
                  {
                    text: 'DATETIME',
                    style: 'tableHeader',
                  },
                ],
                ...sorted.value.map((post, index) => {
                  return [
                    index + 1,
                    post.data.title,
                    post.data.author,
                    new Date(post.data.created * 1000).toLocaleString(),
                  ]
                }),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          tableHeader: {
            bold: true,
            fontSize: 8.5,
          },
        }
      }
      pdfMake.createPdf(docDefinition).download();
      ElMessage.success('PDF report downloaded')
      break
    case 'xlsx':
      ElMessage.info('Not implemented yet')
      break
  }
}
</script>
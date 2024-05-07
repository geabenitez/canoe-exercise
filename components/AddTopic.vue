<template>
  <ElDialog v-model="dialogVisible" title="Add new topic" width="600" @close="handleClose">
    <ElForm ref="formRef" label-position="top" :model="ruleForm" :rules="rules" status-icon>
      <ElRow :gutter="6">
        <ElCol :span="12">
          <ElFormItem label="Community name:" prop="id">
            <ElInput v-model="ruleForm.id" :clearable="true" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Display name:" prop="label">
            <ElInput v-model="ruleForm.label" :clearable="true" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="handleClose">Cancel</ElButton>
        <ElButton type="primary" @click="handleSave">
          Add community
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { useMainStore } from '../stores/mainStore'
import type { Topic } from '../types';

const mainStore = useMainStore()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closed'])

const formRef = ref<FormInstance>()
const dialogVisible = ref<boolean>(props.visible)
const ruleForm = reactive<Topic>({
  id: '',
  label: ''
})
const rules = reactive<FormRules<Topic>>({
  id: [
    { required: true, message: 'The community name is required', trigger: 'blur' },
  ],
  label: [
    { required: true, message: 'The display name is required', trigger: 'blur' },
  ],
})


watch(() => props.visible, (value) => {
  dialogVisible.value = value
})

const handleSave = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      mainStore.addTopic({ ...ruleForm })
      handleClose()
    }
  })
}

const handleClose = () => {
  formRef.value?.resetFields()
  dialogVisible.value = false
  emit('closed')
}

</script>
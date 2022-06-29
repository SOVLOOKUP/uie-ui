<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next'
import type { Schema } from '~/composables/api/uie'

const model_name = useRouter().currentRoute.value.params.model_name as string
const schema = ref<Schema[]>([])

onMounted(async () => {
  const tableData = await api.uie.list_model()
  const tmpSchema = tableData.find(i => i.model_name === model_name)?.schema
  if (tmpSchema !== undefined)
    schema.value = tmpSchema
})

const uploadJson = async () => {
  if (schema !== undefined) {
    await api.uie.set_schema(model_name, schema.value)
    MessagePlugin.success('保存成功')
  }
}
</script>

<template>
  <JsonEditorVue v-model="schema" />
  <t-button @click="uploadJson">
    保存
  </t-button>
</template>

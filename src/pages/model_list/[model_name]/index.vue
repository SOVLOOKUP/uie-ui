<script setup lang="ts">
import type { Data, SubmitContext } from 'tdesign-vue-next'
import VueJsonPretty from 'vue-json-pretty'
import type { UIEResult } from '~/composables/api/uie'
import 'vue-json-pretty/lib/styles.css'

const FORM_RULES = { text: [{ required: true, message: '内容必填' }] }
const formData = ref({ text: '' })
const model_name = useRouter().currentRoute.value.params.model_name as string
const result = ref<UIEResult[]>([])
const loading = ref(false)

const onSubmit = async (context: SubmitContext<Data>) => {
  if (context.validateResult === true) {
    loading.value = true
    result.value = await api.uie.run_model(model_name, formData.value.text.split('\n'))
    loading.value = false
  }
}
</script>

<template>
  <t-form
    :rules="FORM_RULES" :data="formData" @submit="onSubmit"
  >
    <t-form-item label="内容" name="text" initial-data="">
      <t-textarea v-model="formData.text" placeholder="请输入内容, 多个内容以回车分割" />
    </t-form-item>
    <t-form-item>
      <t-button theme="primary" type="submit" :loading="loading">
        提交
      </t-button>
    </t-form-item>
  </t-form>
  <vue-json-pretty path="res" :data="result" />
</template>

<route lang="yaml">
meta:
  layout: run
</route>

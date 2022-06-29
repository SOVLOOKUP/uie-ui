<script setup lang="ts">
import type { Data, SubmitContext } from 'tdesign-vue-next'
import type { ModelInfoPlus } from '~/composables/api/uie'
import 'xe-utils'
import 'vxe-table/lib/style.css'

const tableData = ref<ModelInfoPlus[]>([])
const formData = ref({ model_name: '', model_path: '' })
const buttonLoading = ref(false)

const FORM_RULES = { model_name: [{ required: true, message: '模型名称必填' }, { validator: (v: string) => !tableData.value.map(d => d.model_name).includes(v), message: '名称已存在' }] }
const listModel = async () =>
  tableData.value = await api.uie.list_model()
const deleteModel = async (model_name: string) =>
  tableData.value = await api.uie.delete_model(model_name)
const createModel = async (context: SubmitContext<Data>) => {
  if (context.validateResult === true) {
    buttonLoading.value = true
    tableData.value = await api.uie.create_model(formData.value)
    buttonLoading.value = false
  }
}

onMounted(listModel)
</script>

<template>
  <vxe-toolbar class="pa-5">
    <template #buttons>
      <t-button class="mx-3" variant="outline" @click="listModel">
        刷新
      </t-button>
    </template>
    <template #tools>
      <t-form :rules="FORM_RULES" :data="formData" layout="inline" @submit="createModel">
        <t-form-item label="模型名称" name="model_name" initial-data="">
          <t-input v-model="formData.model_name" placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="模型路径" name="model_path" initial-data="">
          <t-input v-model="formData.model_path" placeholder="请输入内容" />
        </t-form-item>
        <t-button type="submit" style="margin-right: 10px" :loading="buttonLoading">
          添加
        </t-button>
      </t-form>
    </template>
  </vxe-toolbar>

  <vxe-table :data="tableData" align="center">
    <vxe-column type="seq" width="60" />
    <vxe-column title="名称">
      <template #default="{ row }">
        <t-tooltip :content="row.model_path">
          <span>{{ row.model_name }}</span>
        </t-tooltip>
      </template>
    </vxe-column>
    <vxe-column title="创建时间">
      <template #default="{ row }">
        <span>{{ parseTimeStamp(row.create_time) }}</span>
      </template>
    </vxe-column>
    <vxe-column title="Schema" field="schema">
      <template #default="{ row }">
        <vxe-button content="可视编辑" @click="$router.push(`/model_list/${row.model_name}/schema`)" />
      </template>
    </vxe-column>
    <vxe-column title="操作">
      <template #default="{ row }">
        <vxe-button status="primary" content="运行" @click="$router.push(`/model_list/${row.model_name}`)" />
        <vxe-button status="danger" content="删除" @click="deleteModel(row.model_name)" />
      </template>
    </vxe-column>
  </vxe-table>
</template>

import JsonEditorVue from 'json-editor-vue'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(JsonEditorVue)
}

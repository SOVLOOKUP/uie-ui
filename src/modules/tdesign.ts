import TDesign from 'tdesign-vue-next'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(TDesign)
}

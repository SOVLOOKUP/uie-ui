import VXETable from 'vxe-table'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VXETable)
}

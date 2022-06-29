import ky from 'ky'
import { MessagePlugin } from 'tdesign-vue-next'

interface ModelInfo { model_path: string; create_time: number; schema: Schema[] }
interface DownloadData { string: ModelInfo }
interface ModelInfoPlus extends ModelInfo {model_name: string}
type Schema = string | { string: string[] }

interface ResultUnit {
  [key: string]: {
    text: string
    start: number
    end: number
    probability: number
    relations?: ResultUnit
  }[]
}

type UIEResult = ResultUnit[]

const entry = ky.create({
  throwHttpErrors: false,
  timeout: 3600000,
})

const convertTotableData = (downloadData: DownloadData): ModelInfoPlus[] => Object.entries(downloadData).map(([key, content]) => ({
  model_name: key,
  ...content,
}))

const list_model = async (): Promise<ModelInfoPlus[]> => {
  const res: DownloadData = await entry.get(uie_service_url).json()
  return convertTotableData(res)
}

const delete_model = async (model_name: string): Promise<ModelInfoPlus[]> => {
  const json: DownloadData = await entry.delete(uie_service_url, {
    searchParams: {
      model_name,
    },
  }).json()
  return convertTotableData(json)
}

const create_model = async ({ model_name, model_path }: { model_name: string; model_path: string }): Promise<ModelInfoPlus[]> => {
  const res = await entry.put(uie_service_url, {
    searchParams: {
      model_name,
      model_path,
    },
  })

  const json = await res.json()

  if (res.status === 404) {
    MessagePlugin.error((json as any)?.detail)
    return await list_model()
  }
  else {
    return convertTotableData(json as DownloadData)
  }
}

const set_schema = async (model_name: string, schema: Schema[]): Promise<ModelInfo> => {
  return await entry.post(uie_service_url, {
    searchParams: {
      model_name,
    },
    json: schema,
  }).json()
}

const run_model = async (model_name: string, text: string[]): Promise<UIEResult[]> => {
  return await entry.post(uie_service_url + model_name, {
    json: text,
  }).json()
}

export { list_model, delete_model, create_model, set_schema, run_model }
export type { ModelInfo, ModelInfoPlus, UIEResult, Schema }

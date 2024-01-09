import {
  FieldProps,
  RaRecord,
  SaveHandler,
  useRecordContext,
  useSaveContext,
} from 'react-admin'
import { isEqual } from 'lodash'

export const diffObjects = (old: any, updated: any) => {
  const diffObj: any = {}
  if (!old) return updated

  Object.keys(updated).forEach((key) => {
    if (!isEqual(old[key], updated[key])) {
      diffObj[key] = updated[key]
    }
  })
  return diffObj
}

export const useSaveOnlyChanges = () => {
  const record = useRecordContext()
  const { save } = useSaveContext()

  const diffSave = (data: FieldProps) => {
    if (save) save(diffObjects(record, data))
    else throw new Error('save context undefined')
  }

  const diffSaveAdvanced: SaveHandler<RaRecord> = async (data, callbacks) => {
    if (save) {
      const d = diffObjects(record, data)
      return await save(d, callbacks)
    }

    throw new Error('save context undefined')
  }

  return {
    saveOnlyChanges: diffSave,
    saveOnlyChangesWithCallbacks: diffSaveAdvanced,
  }
}

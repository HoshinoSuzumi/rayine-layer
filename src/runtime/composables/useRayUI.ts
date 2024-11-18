import { type Ref, useAttrs, computed, toValue } from 'vue'
import type { DeepPartial, Strategy } from '../types/utils'
import { mergeUiConfig } from '../utils'
import { omit, getValueByPath } from '../utils/objectUtils'
import { useAppConfig } from '#app'

export const useRayUI = <T>(
  key: string,
  ui?: Ref<(DeepPartial<T> & { strategy?: Strategy }) | undefined>,
  config?: T | Ref<T>,
) => {
  const _attrs = useAttrs()
  const appConfig = useAppConfig()

  const attrs = computed(() => omit(_attrs, ['class']))

  const _computedUiConfig = computed(() => {
    const _ui = toValue(ui)
    const _config = toValue(config)

    return mergeUiConfig<T>(
      _ui?.strategy || (appConfig.rayui?.strategy as Strategy),
      _ui || {},
      getValueByPath(appConfig.rayui, key, {}),
      _config || {},
    )
  })

  return {
    ui: _computedUiConfig,
    attrs,
  }
}

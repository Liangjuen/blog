import { defineStore } from 'pinia'
import { Names } from './store-name'

type Themes = 'dark' | 'light' | 'auto'

interface State {
  theme: Themes
}

export const useIndexStore = defineStore(Names.INDEX, {
  state: (): State => {
    return {
      // 主题模式
      theme: 'dark'
    }
  },
  lasting: {
    enabled: true,
    strategies: {
      storage: localStorage,
      // immediate: true
    }
  }
})
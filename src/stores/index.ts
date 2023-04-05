import { defineStore } from 'pinia'
import { Names } from './store-name'


export const useIndexStore = defineStore(Names.INDEX, {
    state: () => {
        return {
            // 主题模式
            theme: 'auto'
        }
    },
    lasting: {
      enabled: true,
      strategies: {
        storage: localStorage
      }
    }
})
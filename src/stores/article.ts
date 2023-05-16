import { defineStore } from 'pinia'
import { Names } from './store-name'
import API from '@/network/api/index'

export const useArticleStore = defineStore(Names.ARTICLE, {
    state: () => {
        return {
            article: <API.Article>{},
            categoris: <API.CateList>[],
            tags: <API.TagList>[]
        }
    },

    actions: {
        async getCategoris() {
            const data = await API.getAllCategoris()
            this.categoris = data
        },

        async getTags() {
            const data = await API.getTags()
            this.tags = data
        },

        setArticle(current: API.Article) {
            this.article = current
        }
    },

    lasting: {
        enabled: true,
        strategies: {
            storage: sessionStorage
        }
    }
})
import { defineStore } from 'pinia'
import { Names } from './store-name'
import API from '@/network/api/index'

type PrevArtList = { id: number, title: string }[]

export const useArticleStore = defineStore(Names.ARTICLE, {
    state: () => {
        return {
            id: 0,
            article: <API.Article>{},
            categoris: <API.CateList>[],
            tags: <API.TagList>[],
            prevArtList: <PrevArtList>[]
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
        },

        async getArticle(id: number) {
            const data = await API.getArticleById({ id })
            data.tags = data.tags.split(',')
            this.article = data
        },

        setPrevArtList(list: API.Article[]) {
            this.prevArtList = list.map(art => ({ id: art.id, title: art.title }))
        }
    },

    lasting: {
        enabled: true,
        strategies: {
            storage: sessionStorage
        }
    }
})
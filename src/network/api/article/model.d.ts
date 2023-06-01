declare namespace API {
    interface GetArticleList {
        offset: number,
        pageSize: number
    }

    interface GetArticlesByTypeId extends GetArticleList {
        type?: 'cate' | 'tag',
        id?: number | string
    }

    interface Article {
        title: string,
        cover: string,
        id: number,
        summary: string,
        create_time: string,
        tags: string,
        [propName: string]: any
    }

    interface ArticleData {
        list: Article[]
        offset: number
        pageSize: number
        total: number
    }

    interface ArticleContent {
        id: number,
        article_id: number,
        content_md: string,
        content_html: string
    }

    interface GetArticleContent {
        id: number
    }

    interface GetArticle {
        id: number
    }
}


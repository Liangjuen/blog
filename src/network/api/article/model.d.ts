declare namespace API {
    interface GetArticleList {
        offset: number, 
        pageSize: number
    }

    interface GetArticlesByTypeId extends GetArticleList {
        type: 'cate' | 'tag', 
        id: number
    }
    
    type Article = {
        title: string, 
        cover: string, 
        id: number, 
        summary: string, 
        create_time: string,
        [propName:string]:any
    }

    export type ArticleData = {
        list: Article[]
        offset: number
        pageSize: number
        total: number
    }
}


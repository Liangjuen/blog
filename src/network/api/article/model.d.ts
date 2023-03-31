declare namespace API {
    interface GetArticleList {
        offset: number, 
        pageSize: number
    }

    interface GetArticlesByTypeId extends GetArticleList {
        type: 'cate' | 'tag', 
        id: number
    }
    
    interface Article {
        title: string, 
        cover: string, 
        id: number, 
        summary: string, 
        create_time: string,
        [propName:string]:any
    }

    interface ArticleData {
        list: Article[]
        offset: number
        pageSize: number
        total: number
    }
}


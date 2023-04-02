declare namespace API {
    interface CategoryItem {
        id:number,
        name: string,
        alias: string,
        description: string,
        parent_id: number,
        create_time: string,
        [propName:string]: any
    }

    type CateList = CategoryItem[]
}
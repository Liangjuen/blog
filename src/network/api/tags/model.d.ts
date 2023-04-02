declare namespace API {
    interface TagItem {
        id: number,
        name: string,
        description: string,
        create_time: string,
        alias: string,
        is_delete: number
    }

    type TagList = TagItem[]
}
export interface NavList {
    path: string,
    title: string,
    index: number
}

const navList: NavList[] = [
    { path: '/categoris', title: '分类', index:0 },
    { path: '/tags', title: '标签', index:1 },
    { path: '/articleList', title: '我的', index:2 },
    { path: '/article', title: '友链', index:3 }
]

export default () => navList
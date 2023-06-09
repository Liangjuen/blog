import { useRoute } from "vue-router"
import { computed } from 'vue'
export interface NavList {
    path: string,
    title: string,
    index: number,
    icon: string
}

const navList: NavList[] = [
    { path: '/categoris', title: '分类', index: 0, icon: 'icon-Category_outline' },
    { path: '/tags', title: '标签', index: 1, icon: 'icon-tags_outline' },
    { path: '/about', title: '关于', index: 2, icon: 'icon-user_outline' },
    { path: '/categoris', title: '友链', index: 3, icon: 'icon-lianjie' }
]

export const useActiveNav = () => {
    const route = useRoute()
    let activePath = computed(() => route.path)
    return activePath
}

export default () => navList